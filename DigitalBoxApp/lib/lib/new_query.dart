import 'dart:convert';

import 'package:digital_box/login.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:file_picker/file_picker.dart';
import 'dart:io';

class NewQueryPage extends StatefulWidget {
  final String curruser;

  NewQueryPage({required this.curruser});

  @override
  _NewQueryPageState createState() => _NewQueryPageState();
}

class _NewQueryPageState extends State<NewQueryPage> {
  final TextEditingController _titleController = TextEditingController();
  final TextEditingController _descController = TextEditingController();
  File? _document;

  void _addQueryToMongoDB(String title, String desc) async {
    final url = Uri.parse('http://192.168.138.8:3000/add_query');
    final response = await http.post(
      url,
      headers: <String, String>{
        'Content-Type': 'application/json',
      },
      body: jsonEncode({
        'title': title,
        'description': desc,
        'username': widget.curruser,
      }),
    );

    if (response.statusCode == 200 || response.statusCode == 201) {
      Navigator.pop(context);
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Query added successfully')),
      );
    } else {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Failed to add query: ${response.body}')),
      );
    }
  }

  Future<void> _uploadDocument() async {
    if (_document == null) {
      print('No document selected.');
      return;
    }

    print('Uploading document: ${_document!.path}');

    var request = http.MultipartRequest(
      'POST',
      Uri.parse('http://192.168.138.8:3000/api/upload'),
    );

    request.files.add(
      http.MultipartFile(
        'file',
        _document!.readAsBytes().asStream(),
        _document!.lengthSync(),
        filename: _document!.path.split('/').last,
      ),
    );

    var response = await request.send();

    if (response.statusCode == 200) {
      print('File uploaded successfully');
    } else {
      print('Error uploading file: ${response.reasonPhrase}');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('New Query'),
      ),
      body: Padding(
        padding: EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            TextField(
              controller: _titleController,
              decoration: InputDecoration(labelText: 'Title'),
            ),
            SizedBox(height: 16.0),
            TextField(
              controller: _descController,
              decoration: InputDecoration(labelText: 'Description'),
              maxLines: 4,
            ),
            SizedBox(height: 16.0),
            ElevatedButton(
              onPressed: () {
                _addQueryToMongoDB(_titleController.text, _descController.text);
              },
              child: Text('Add Query'),
            ),
            SizedBox(height: 20.0),
            _document == null
                ? Text('No document selected.')
                : Text('Document selected: ${_document!.path}'),
            SizedBox(height: 20.0),
            ElevatedButton(
              onPressed: () async {
                final result = await FilePicker.platform.pickFiles();
                if (result != null && result.files.isNotEmpty) {
                  setState(() {
                    _document = File(result.files.single.path!);
                  });
                }
              },
              child: Text('Select Document'),
            ),
            SizedBox(height: 20.0),
            ElevatedButton(
              onPressed: _document == null ? null : _uploadDocument,
              child: Text('Upload Document'),
            ),
          ],
        ),
      ),
    );
  }

  @override
  void dispose() {
    _titleController.dispose();
    _descController.dispose();
    super.dispose();
  }
}
