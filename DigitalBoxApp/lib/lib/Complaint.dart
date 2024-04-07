import 'package:flutter/material.dart';
import 'myComplaint.dart';
import 'userProducts.dart';

class ComplaintPage extends StatelessWidget {

  late final String curruser;
  
  ComplaintPage(this.curruser);


  @override
  Widget build(BuildContext context) {
    return Scaffold(
        backgroundColor: Colors.blue.shade50,
        appBar: AppBar(
          toolbarHeight: 100,
          title: Text('BARCLAYS',
              style: TextStyle(
                  fontWeight: FontWeight.bold,
                  color: Colors.blue,
                  fontSize: 30)),
        ),
        body: Column(
          children: [
            InkWell(
              onTap: () {
                print(' My Complaint and Requests');
                Navigator.push(
                  context,
                  MaterialPageRoute(builder: (context) => MyComplaintsPage(curruser)),
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
                    'My Complaints and Requests',
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
                print(' New Complaint');
                Navigator.push(
                  context,
                  MaterialPageRoute(builder: (context) => UserProducts(curruser)),
                );
              },
              child: Container(
                margin: EdgeInsets.all(20),
                width: 200,
                height: 100,
                child: Center(
                  child: Text(
                    ' New Complaint',
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
          ],
        ));
  }
}
