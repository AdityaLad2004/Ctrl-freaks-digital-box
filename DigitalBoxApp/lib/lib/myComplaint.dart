import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

class MyComplaintsPage extends StatefulWidget {
  final String currUser;

  MyComplaintsPage(this.currUser);

  @override
  _MyComplaintsPageState createState() => _MyComplaintsPageState();
}

class _MyComplaintsPageState extends State<MyComplaintsPage> {
  List<String> _complaints = [];

  @override
  void initState() {
    super.initState();
    _fetchComplaints();
  }

  Future<void> _fetchComplaints() async {
    try {
      final response = await http.get(
        Uri.parse('http://192.168.138.8:3000/my_complaints?username=${widget.currUser}'),
      );

      if (response.statusCode == 200 || response.statusCode==201) {
        final List<dynamic> data = jsonDecode(response.body)['complaints'];
        setState(() {
          _complaints = List<String>.from(data);
        });
      } else {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Error fetching complaints')),
        );
      }
    } catch (e) {
      print('Error fetching complaints: $e');
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Error fetching complaints')),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('My Complaints'),
      ),
      body: ListView.builder(
        itemCount: _complaints.length,
        itemBuilder: (context, index) {
          final complaint = _complaints[index];
          return Card(
            child: ListTile(
              title: Text(complaint),
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