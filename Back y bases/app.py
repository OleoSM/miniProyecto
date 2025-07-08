#Hacemos uso de flask para conectar react con la lógica de py y sql

from flask import Flask, request, jsonify
from flask_mysqldb import MySQL
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'root'
app.config['MYSQL_DB'] = 'gestor_tareas'
mysql = MySQL(app)

@app.route('/productos', methods=['GET'])
def obtener_productos():
    filtro = request.args.get('filtro')
    valor = request.args.get('valor')
    ordenar = request.args.get('ordenar')

    query = "SELECT * FROM productos"
    condiciones = []
    params = []

    # Filtrar por condicion
    if filtro == 'condicion' and valor:
        condiciones.append("condicion = %s")
        params.append(valor)
    # Filtrar por localización
    elif filtro == 'localizacion' and valor:
        condiciones.append("localizacion = %s")
        params.append(valor)

    # Añadir filtros 
    if condiciones:
        query += " WHERE " + " AND ".join(condiciones)

    # Ordenar por precio
    if ordenar == 'precio_desc':
        query += " ORDER BY precio DESC"

    cur = mysql.connection.cursor()
    cur.execute(query, params)
    resultados = cur.fetchall()
    productos = []
    for row in resultados:
        productos.append({
            'id': row[0],
            'nombre': row[1],
            'precio': float(row[2]),
            'condicion': row[3],
            'localizacion': row[4],
            'fecha_agregado': str(row[5])
        })
    cur.close()
    return jsonify(productos)

@app.route('/productos/nuevos', methods=['GET'])
def productos_mas_nuevos():
    cur = mysql.connection.cursor()
    cur.execute("SELECT nombre, precio FROM productos ORDER BY fecha_agregado DESC LIMIT 5")
    resultados = cur.fetchall()
    productos = []
    for row in resultados:
        productos.append({'nombre': row[0], 'precio': float(row[1])})
    cur.close()
    return jsonify(productos)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
