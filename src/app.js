/**
 * IoT Control Watch 
 *
 * Lex Dreitser
 */
var ajax = require('ajax');
var Clock = require('clock');
var Accel = require('ui/accel');
var UI = require('ui');
var Vector2 = require('vector2');
var Vibe = require('ui/vibe');


var DEVICE_ID = "54xxxxxxxxxxxxxxxxxxxxx";//FROM SPARKCORE IDE
var ACCESS_TOKEN = "f75xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";//FROM SPARKCORE IDE

Accel.init();  
Accel.on('data', function(e) {
  console.log('Just received ' + e.samples + ' from the accelerometer.');
});
function DoPost(function_name,function_value){
  //make url based on function being called and device tokens
  var URL = 'https://api.spark.io/v1/devices/' + DEVICE_ID + '/' + function_name +'?access_token=' + ACCESS_TOKEN; //identify which sparkcore and function
  
  //log data being used
  console.log("function_name: " + function_name);
  console.log("function_value: " + function_value);
  console.log("URL: " + URL);
  
  ajax(
    {
      url: URL,
      method: 'post',
      type: 'json',
      data: { "args": function_value} //string to send to the sparkcore function, can be named whatever
    },
    function(data) {
      // Success
      console.log("Success: " + JSON.stringify(data));
      Vibe.vibrate('short');
      
      //setTimeout(GetIsClosed(), 30000);
    },
    function(error) {
      // Failure
      console.log('Failed: ' + error.toString());
      Vibe.vibrate('long');
  
      
    }
  );
}
function DoGet(function_name){
  console.log("DoGet(): " + new Date().getTime());  
  
  //display card
  
  
  //make url based on function being called and device tokens
  var URL = 'https://api.spark.io/v1/devices/' + DEVICE_ID + '/' + function_name +'?access_token=' + ACCESS_TOKEN; //identify which sparkcore and function
  
  //log data being used
  console.log("function_name: " + function_name);
  console.log("URL: " + URL);
  
  ajax(
    {
      url: URL,
      type: 'json'
    },
    function(data) {
      // Success
      console.log("Success: " + JSON.stringify(data));
      Vibe.vibrate('short');
      // Show to user
      
    
    },
    function(error) {
      // Failure
      console.log('Failed: ' + error.toString());
      Vibe.vibrate('long');
    }
  );
  
  console.log("Comleted DoGet(): " + new Date().getTime());  
}


// Make a list of menu items
var options = [
  {
    title: "Occupancy",
    subtitle: "Motion and Door Sensors"
  },
  {
    title: "Lights",
    subtitle: "Control Lights"
  },
  {
    title: "Garage Doors",
    subtitle: "Control Garage Doors"
  },
  {
    title: "Coffee",
    subtitle: "Coffeemaker Control"
  },
  {
    title: "Drone",
    subtitle: "Drone Control with Accelerometer"
  }


];

var optionMenu = new UI.Menu({
  sections: [{
    title: 'IoT Control Watch',
    items: options
  }]
});

var garage = [
  {
    title: "Right",
    subtitle: "Main Door"
  },
  {
    title: "Left",
    subtitle: "Side Door"
  }
];
var garageControl = new UI.Menu({
  sections: [{
    title: 'Garage Control Panel',
    items: garage
  }]
});

var coffee = [
  {
    title: "Upstairs",
    subtitle: "In Kitchen"
  },
  {
    title: "Workshop",
    subtitle: "Nitro Boosted"
  }
];
var coffeeControl = new UI.Menu({
  sections: [{
    title: 'Coffee Control Panel',
    items: coffee
  }]
});

var lights = [
  {
    title: "Light 1",
    subtitle: "Toggle North Light"
  },
  {
    title: "Light 2",
    subtitle: "Toggle Door Light"
  },
  {
    title: "Light 3",
    subtitle: "Toggle South Light"
  }
];
var lightControl = new UI.Menu({
  sections: [{
    title: 'Light Control Panel',
    items: lights
  }]
});

optionMenu.show();
//main.show();

optionMenu.on('select', function(event) {
  //var window = new UI.Window();  
  
  if(event.itemIndex ===1){
    lightControl.show();
  }else if(event.itemIndex ===2){
    garageControl.show();
  }else if(event.itemIndex ===3){
    coffeeControl.show();
  }
  

});

// Light Control
lightControl.on('select', function(event) {
   if(event.itemIndex ===0){
    DoPost('ToggleLight','1');
   }else if(event.itemIndex ===1){
     DoPost('ToggleLight','2');
   }else if(event.itemIndex ===2){
     DoPost('ToggleLight','3');
   }
  
});

// Garage Control
garageControl.on('select', function(event) {
   if(event.itemIndex ===0){
    DoPost('ToggleGarage','1');
   }else if(event.itemIndex ===1){
    DoPost('ToggleGarage','2');
   }
  
});
// Coffee Control
coffeeControl.on('select', function(event) {
   if(event.itemIndex ===0){
    DoPost('BrewCoffee','1');
   }else if(event.itemIndex ===1){
    DoPost('BrewCoffee','2');
   }
  
});
