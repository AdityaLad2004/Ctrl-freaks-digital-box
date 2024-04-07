import 'package:flutter/material.dart';
import 'my_queries.dart'; // Importing the file.dart for 'My Queries'
import 'new_query.dart'; // Importing the file.dart for 'New Query'

class QueryPage extends StatelessWidget {
  final String curruser;

  QueryPage({required this.curruser});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Query Page'),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            ElevatedButton(
              onPressed: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(builder: (context) => MyQueriesPage(curruser: curruser)), // Pass curruser to MyQueriesPage
                );
              },
              child: Text('My Queries'),
            ),
            ElevatedButton(
              onPressed: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(builder: (context) => NewQueryPage(curruser: curruser)), // Pass curruser to NewQueryPage
                );
              },
              child: Text('New Query'),
            ),
          ],
        ),
      ),
    );
  }
}