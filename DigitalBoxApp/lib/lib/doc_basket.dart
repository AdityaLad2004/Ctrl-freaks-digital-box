import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:file_picker/file_picker.dart';
import 'dart:io';

class DocBasket extends StatefulWidget {
  @override
  _DocBasketState createState() => _DocBasketState();
}

class _DocBasketState extends State<DocBasket> {
  File? _document;

  Future<void> _uploadDocument() async {
    if (_document == null) {
      print('No document selected.');
      return;
    }

    print('Uploading document: ${_document!.path}');

    // Create a multipart request for file upload
    var request = http.MultipartRequest(
      'POST',
      Uri.parse('http://192.168.138.8:3000/api/upload'), // Replace with your backend server address
    );

    // Add the file to the request
    request.files.add(
      http.MultipartFile(
        'file',
        _document!.readAsBytes().asStream(),
        _document!.lengthSync(),
        filename: _document!.path.split('/').last,
      ),
    );

    // Send the request
    var response = await request.send();

    // Check the response status
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
        title: Text('Document Basket'),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
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
}