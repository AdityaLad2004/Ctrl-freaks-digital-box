import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

class MyQueriesPage extends StatefulWidget {
  final String curruser;
  MyQueriesPage({required this.curruser});

  @override
  _MyQueriesPageState createState() => _MyQueriesPageState();
}

class _MyQueriesPageState extends State<MyQueriesPage> {
  List<Map<String, dynamic>> _queries = [];

  @override
  void initState() {
    super.initState();
    _fetchQueries();
  }

  Future<void> _fetchQueries() async {
    try {
      final response = await http.get(
        Uri.parse('http://192.168.138.8:3000/my_queries?username=${widget.curruser}'),
      );

      if (response.statusCode == 200 || response.statusCode==201) {
        final List<dynamic> data = jsonDecode(response.body)['queries'];
        setState(() {
          _queries = data.cast<Map<String, dynamic>>();
        });
      } else {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Error fetching queries')),
        );
      }
    } catch (e) {
      print('Error fetching queries: $e');
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Error fetching queries')),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('My Queries'),
      ),
      body: ListView.builder(
        itemCount: _queries.length,
        itemBuilder: (context, index) {
          final query = _queries[index];
          return Card(
            child: ListTile(
              title: Text(query['title']),
              subtitle: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(query['description']),
                  SizedBox(height: 4),
                  Text('Status: ${query['status']}'),
                ],
              ),
              onTap: () {
                // Handle onTap if needed
              },
            ),
          );
        },
      ),
    );
  }
}