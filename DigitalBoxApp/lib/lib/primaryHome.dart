import 'package:flutter/material.dart';
import 'main_homepage.dart';

class PrimaryHomePage extends StatelessWidget {

  late final String curruser;
  
  PrimaryHomePage(this.curruser);


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
        body: Center(
          child: Column(
            children: <Widget>[
              Container(
                margin: EdgeInsets.all(20),
                width: 200,
                height: 100,
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(11),
                  color: Colors.white,
                ),
                child: Center(
                  child: Text(
                    'Button 1',
                    style: TextStyle(
                      fontSize: 20,
                      color: Colors.black,
                    ),
                  ),
                ),
              ),
              Container(
                margin: EdgeInsets.all(20),
                width: 200,
                height: 100,
                child: Center(
                  child: Text(
                    'Button 2',
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
              InkWell(
                onTap: () {
                  // print('Complaint');
                  Navigator.push(
                    context,
                    MaterialPageRoute(builder: (context) => MainHomePage(curruser)),
                  );
                },
                child: Container(
                  margin: EdgeInsets.all(20),
                  width: 200,
                  height: 100,
                  child: Center(
                    child: Text(
                      'Digital Box ',
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
          ),
        ));
  }
}
