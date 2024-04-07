import 'dart:convert';
import 'package:digital_box/login.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

class UserProducts extends StatefulWidget {
  final String curruser;

  UserProducts(this.curruser);

  @override
  _UserProductsState createState() => _UserProductsState();
}

class _UserProductsState extends State<UserProducts> {
  List<String> _products = [];

  @override
  void initState() {
    super.initState();
    _fetchProducts();
  }

  _fetchProducts() async {
    final response = await http.get(
      Uri.parse('http://192.168.138.8:5000/user_products?username=${widget.curruser}'),
    );

    if (response.statusCode == 200) {
      final data = jsonDecode(response.body); 
      setState(() {
        _products = List<String>.from(data['products']);
      });
    } else {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Error fetching products')),
      );
    }
  }

  Future<String> _getAuthToken() async {
    final prefs = await SharedPreferences.getInstance();
    return prefs.getString('authToken') ?? '';
  }

  // Navigate to new page with the selected product
  _navigateToProductPage(String product) {
    Navigator.of(context).push(
      MaterialPageRoute(
        builder: (context) => ProductPage(product, widget.curruser), // Pass curruser to ProductPage
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('User Products'),
      ),
      body: ListView.builder(
        itemCount: _products.length,
        itemBuilder: (context, index) {
          final product = _products[index];
          return Card(
            child: Padding(
              padding: const EdgeInsets.all(8.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: <Widget>[
                  TextButton(
                    onPressed: () => _navigateToProductPage(product),
                    child: Text(product),
                  ),
                ],
              ),
            ),
          );
        },
      ),
    );
  }
}

class ProductPage extends StatefulWidget {
  final String product;
  final String curruser; // Add curruser property

  ProductPage(this.product, this.curruser); // Modify the constructor

  @override
  _ProductPageState createState() => _ProductPageState();
}

class _ProductPageState extends State<ProductPage> {

  final TextEditingController titleController = TextEditingController();
  final TextEditingController descriptionController = TextEditingController();

  void _submitComplaint(String title, String description) async {
  try {
    final response = await http.post(
      Uri.parse('http://192.168.138.8:3000/complaints'),
      headers: <String, String>{
        'Content-Type': 'application/json',
      },
      body: jsonEncode({
        'product': widget.product,
        'username': widget.curruser,
        'title': title,
        'description': description,
        // 'statuss': "open"
      }),
    );

    if (response.statusCode == 200 || response.statusCode == 201) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Complaint submitted successfully')),
      );
    } else {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Error submitting complaint: ${response.statusCode}')),
      );
    }
  } catch (e) {
    print('Error submitting complaint: $e');
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(content: Text('Error submitting complaint')),
    );
  }
}


  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Submit Complaint'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text(widget.product),
            SizedBox(height: 20),
            TextField(
              controller: titleController,
              decoration: InputDecoration(labelText: 'Title'),
            ),
            SizedBox(height: 20),
            TextField(
              controller: descriptionController,
              decoration: InputDecoration(labelText: 'Description'),
            ),
            SizedBox(height: 20),
            ElevatedButton(
              onPressed: () {
                // Call the function to submit complaint
                _submitComplaint(
                  titleController.text,
                  descriptionController.text,
                );
              },
              child: Text('Submit Complaint'),
            ),
          ],
        ),
      ),
    );
  }
}
