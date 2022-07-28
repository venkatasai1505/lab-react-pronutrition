import React, { Component } from 'react';
import { RightSide } from './RightSide';

export default class FoodBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // Data
      fruits: [
        {
          name: 'orange',
          calories: 65,
          img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnPZ-zpuA2v6ZfzrH9ePrewEJpXEHrLa6SMw&usqp=CAU',
        },
        {
          name: 'chocolate milk',
          calories: 208,
          img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWNPhehw1kTo2xEyFyTC-XSEzN5_x6OIb3Xw&usqp=CAU',
        },
        {
          name: 'apple',
          calories: 81,
          img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEF-lAKF-ih6i-_1QHErs7PI-Nu_dD1ms_Eg&usqp=CAU',
        },
        {
          name: 'watermelon',
          calories: 85,
          img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTH399MMw0IODPY-75ujUDKRhLYosUZX1hCbg&usqp=CAU',
        },
        {
          name: 'banana',
          calories: 105,
          img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLxULMmT2YkBiLRl9j5ip2twxGukAB7WM-qw&usqp=CAU',
        },
        {
          name: 'biscuit',
          calories: 103,
          img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuNC7LjSuBeFdnw9w454ZNbDrDw-rerEWiVQ&usqp=CAU',
        },
        {
          name: 'pizza',
          calories: 290,
          img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMX18F86ZMZLAU576GVWGg_isIJ59i5OZ2Pw&usqp=CAU',
        },
        {
          name: 'grapes',
          calories: 114,
          img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSR2_zA5Au11drohgBtKiTm8tj6sR6WBWHm7A&usqp=CAU',
        },
        {
          name: 'raspberries',
          calories: 61,
          img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCX_ZEYmjZfs2BZnoDWSZtiyQW9LSfKxGAtQ&usqp=CAU',
        },
        {
          name: 'strawberries',
          calories: 45,
          img: 'https://media.gettyimages.com/photos/strawberry-picture-id154514873?s=612x612',
          
        },
      ],
      searchTxt: '', // Data to be searched
      calories_count: 0, // Total calories
      myFruits: [],
    };
  }
  // method for searching the fruit
  searchFruit = (event) => {
    this.setState({
      searchTxt: event.target.value,
    });
  };
  // Capitalize the first letter of the fruit
  capatalize = (name) => {
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  };
  // Add fruits to calories section
  addFruit = async (event) => {
    let count = document.getElementById(event.target.value).value;
    let cal = this.state.fruits.filter((fruit) => {
      return fruit.name === event.target.value;
    });
    let fruitObj = {
      id: event.target.value,
      text: `${count} ${event.target.value} = ${cal[0].calories * count}`,
      btn_id: `${event.target.value}R`,
      calo: cal[0].calories * count,
    };
    await this.setState({
      myFruits: this.state.myFruits.concat(fruitObj),
      calories_count: this.state.calories_count + cal[0].calories * count,
    });
    console.log(this.state.myFruits);
  };
  // Remove fruits from calories
  removeFruit = (event) => {
    console.log(event.target.value);
    document.getElementById(event.target.value).remove();
    let calorie = this.state.myFruits.filter((fruit) => {
      return `${fruit.id}R` === event.target.value;
    });
    console.log(calorie);
    this.setState({
      calories_count: this.state.calories_count - calorie[0].calo,
    });
    console.log(calorie[0].calo);
  };

  // Main Render method
  render() {
    return (
      <div className="main-container">
        <div className="search-container">
          <h1>Search</h1>
          <input
            type="text"
            placeholder="Find a food"
            onChange={this.searchFruit}
            id="search"
          />
        </div>
        <div className="food-container">
          <div className="left">
            {this.state.fruits
              .filter((fruit) => {
                return fruit.name.includes(this.state.searchTxt);
              })
              .map((fruit) => {
                return (
                  <div key={fruit.name} className="fruit">
                    <img src={fruit.img} alt="" />
                    <div className="detail">
                      <h1>{this.capatalize(fruit.name)}</h1>
                      <h4>{fruit.calories}</h4>
                    </div>
                    <div className="count">
                      <input
                        type="number"
                        defaultValue="1"
                        id={fruit.name}
                        min="0"
                      />
                      <button onClick={this.addFruit} value={fruit.name}>
                        +
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>
          {/* <RightSide
            myFruits={this.state.myFruits}
            removeFruit={this.removeFruit}
            calories_count={this.state.calories_count}
          /> */}
          <div className="right">
            <h1>Today's Food {this.state.calories_count} Calories</h1>
            {this.state.myFruits
              .filter((fruit) => {
                return fruit.text !== '';
              })
              .map((fruit) => {
                return (
                  <div key={fruit.name} className="item" id={fruit.btn_id}>
                    <span>{fruit.text}</span>
                    <button onClick={this.removeFruit} value={fruit.btn_id}>
                      X
                    </button>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    );
  }
}