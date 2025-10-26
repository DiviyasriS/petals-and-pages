from flask import Flask, jsonify, request
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)

# In-memory database (simulate PostgreSQL)
products = [
    {"id": 1, "name": "Rose Bouquet", "price": 45, "category": "flowers", "description": "Classic red roses", "stock": 20},
    {"id": 2, "name": "Tulip Collection", "price": 35, "category": "flowers", "description": "Spring tulips mix", "stock": 15},
    {"id": 3, "name": "Orchid Elegance", "price": 55, "category": "flowers", "description": "Exotic orchids", "stock": 10},
    {"id": 4, "name": "Sunflower Joy", "price": 30, "category": "flowers", "description": "Bright sunflowers", "stock": 25},
    {"id": 5, "name": "Lily Paradise", "price": 40, "category": "flowers", "description": "Fragrant lilies", "stock": 18},
    {"id": 6, "name": "Mixed Bouquet", "price": 50, "category": "flowers", "description": "Seasonal mix", "stock": 12},
    {"id": 7, "name": "The Great Garden", "price": 25, "category": "books", "description": "Nature & Life", "stock": 30},
    {"id": 8, "name": "Poetry in Bloom", "price": 20, "category": "books", "description": "Modern poetry", "stock": 40},
    {"id": 9, "name": "The Flower Code", "price": 30, "category": "books", "description": "Mystery novel", "stock": 22},
    {"id": 10, "name": "Botanical Dreams", "price": 35, "category": "books", "description": "Art & Nature", "stock": 15},
    {"id": 11, "name": "Garden Tales", "price": 22, "category": "books", "description": "Short stories", "stock": 28},
    {"id": 12, "name": "Floral Cookbook", "price": 28, "category": "books", "description": "Recipes", "stock": 20}
]

@app.route('/health', methods=['GET'])
def health():
    return jsonify({"status": "healthy", "service": "product-service"}), 200

@app.route('/api/products', methods=['GET'])
def get_products():
    category = request.args.get('category')
    if category:
        filtered = [p for p in products if p['category'] == category]
        return jsonify(filtered), 200
    return jsonify(products), 200

@app.route('/api/products/', methods=['GET'])
def get_product(product_id):
    product = next((p for p in products if p['id'] == product_id), None)
    if product:
        return jsonify(product), 200
    return jsonify({"error": "Product not found"}), 404

@app.route('/api/products', methods=['POST'])
def create_product():
    new_product = request.json
    new_product['id'] = max([p['id'] for p in products]) + 1
    products.append(new_product)
    return jsonify(new_product), 201

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)