 import React, { Component } from 'react';

 import Aux from '../../hoc/Aux';
 import Burger from '../../components/Burger/Burger';
 import BuildControls from '../../components/Burger/BuildControls/BuildControls';
 import Modal from '../../components/UI/Modal/Modal';
 import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';


const INGREDIENT_PRICES = {
	salad: 0.3,
	cheese: 0.4,
	meat: 1.5,
	bacon: 1
}


 class BurgerBuilder extends Component {

 	state = {
 		ingredients: {
 			salad: 0,
 			bacon: 0,
 			cheese: 0,
 			meat: 0
 		},
 		totalPrice: 4,
 		purcheasable: false,
 		purchasing: false
 	}


 	updatedPurchaseState (ingredients) {
 		const sum = Object.keys(ingredients).map(igKey => {
 			return ingredients[igKey];
 		})
 		.reduce((sum, el) => {
 			return sum + el;
 		}, 0);
 		this.setState({purcheasable: sum > 0});
 	}
 

 	addIngredientHanler = (type) => {
 		const oldCount =  this.state.ingredients[type];
 		const updatedCount = oldCount + 1;
 		const updatedIngredients = {
 			...this.state.ingredients
 		};
 		updatedIngredients[type] = updatedCount;
 		const priceAddition = INGREDIENT_PRICES[type];
 		const oldPrice = this.state.totalPrice;
 		const newPrice = oldPrice + priceAddition;
 		this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
 		this.updatedPurchaseState(updatedIngredients);

 	}


 	removeIngredientHanler = (type) => { 
 		const oldCount =  this.state.ingredients[type];
 		if (oldCount <= 0) {
 			return;
 		}
 		const updatedCount = oldCount - 1;
 		const updatedIngredients = {
 			...this.state.ingredients
 		};
 		updatedIngredients[type] = updatedCount;
 		const priceDeduction = INGREDIENT_PRICES[type];
 		const oldPrice = this.state.totalPrice;
 		const newPrice = oldPrice - priceDeduction;
 		this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
 		this.updatedPurchaseState(updatedIngredients);

 
 	}

 	purchaseHandler = () => {
 		this.setState({purchasing: true});
 	}

 	purchaseCancelHandler = () => {
 		this.setState({purchasing: false});
 	}

 	purchaseContinueHandler = () => {
 		alert('You continue!');
 	}

 	render () {
 		const disabledInfo = {
 			...this.state.ingredients
 		};

 		for (let key in disabledInfo){
 			disabledInfo[key] = disabledInfo[key] <= 0
 		}


 		return (
 			<Aux>
 				<Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
 					<OrderSummary 
 					ingredients={this.state.ingredients}
 					price={this.state.totalPrice}
 					purchaseCancelled={this.purchaseCancelHandler}
 					purchaseContinued={this.purchaseContinueHandler}/>
 				</Modal> 
 				<Burger ingredients = {this.state.ingredients} />
 				<BuildControls 
 					ingredientAdded={this.addIngredientHanler} 
 					ingredientRemoved={this.removeIngredientHanler}
 					disabled={disabledInfo}
 					purcheasable={this.state.purcheasable}
 					ordered={this.purchaseHandler}
 					price={this.state.totalPrice} />
 			</Aux>

 		);
 	}
 }

 export default BurgerBuilder;