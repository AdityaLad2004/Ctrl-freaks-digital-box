import 'package:digital_box/Complaint.dart';
import 'package:flutter/material.dart';
import 'Query.dart'; // Import the Query.dart file

class MainHomePage extends StatelessWidget {
  late final String curruser;

  MainHomePage(this.curruser);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.blue.shade50,
      appBar: AppBar(
        toolbarHeight: 100,
        title: Text('BARCLAYS',
            style: TextStyle(
                fontWeight: FontWeight.bold, color: Colors.blue, fontSize: 30)),
      ),
      body: Center(
        child: Column(
          children: <Widget>[
            InkWell(
              onTap: () {
                // Navigate to the QueryPage
                Navigator.push(
                  context,
                  MaterialPageRoute(builder: (context) => QueryPage(curruser: curruser)),
                );
              },
              child: Container(
                margin: EdgeInsets.all(20),
                width: 200,
                height: 100,
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(11),
                  color: Colors.white,
                ),
                child: Center(
                  child: Text(
                    'Query',
                    style: TextStyle(
                      fontSize: 20,
                      color: Colors.black,
                    ),
                  ),
                ),
              ),
            ),
            InkWell(
              onTap: () {
                // Navigate to the ComplaintPage
                Navigator.push(
                  context,
                  MaterialPageRoute(builder: (context) => ComplaintPage(curruser)),
                );
              },
              child: Container(
                margin: EdgeInsets.all(20),
                width: 200,
                height: 100,
                child: Center(
                  child: Text(
                    'Complaint',
                    style: TextStyle(
                      fontSize: 20,
                      color: Colors.black,
                    ),
                  ),
                ),
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(11),
                  color: Colors.white,
                ),
              ),
            ),
            Container(
              margin: EdgeInsets.all(20),
              width: 200,
              height: 100,
              child: Center(
                child: Text(
                  'Document Upload ',
                  style: TextStyle(
                    fontSize: 20,
                    color: Colors.black,
                  ),
                )
              ),
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(11),
                color: Colors.white,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
