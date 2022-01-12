import React, { useContext, useEffect, useState } from 'react';
import { Button, TransactionInput, TransactionInputList } from '../components';
import { globalStyles } from '../styles';
import { auth, db, rootRef } from '../firebase';
import { FlatList, Keyboard, Text, TouchableWithoutFeedback, View } from 'react-native';
import { TransactionsContext } from '../context/TransactionsContext';
import TransactionHistoryButtons from "../components/TransactionHistoryButtons";
import TransactionHistItem from "../components/TransactionHistItem";
import keyExtractor from "../helpers/keyExtractor";

const Transactions = () => {
	const [histValues, setHistValues] = useState([]);
	const {
		user,
		value,
		setUsers,
		// histValues,
		currentUsers,
		// setTransactions,
		sendTransaction,
		handleChangeValue,
		addUsersToUsersList,
		handleChangeUserList,
		// setTransactionsToUser,
		// setTransactionsFromUser,
	} = useContext(TransactionsContext);

	const setTransactions = (orderBy) => {
		rootRef
			.child('transactions')
			.orderByChild(orderBy)
			.equalTo(`${auth.currentUser?.email}`)
			.on('value', item => {
				if (item.val()) {
					setHistValues(Object.values(item.val()));
				} else {
					setHistValues(null);
				}
			});
	};

	const setTransactionsToUser = () => setTransactions('toUser');

	const setTransactionsFromUser = () => setTransactions('fromUser');

	useEffect(() => {
		db.ref('users').on('value', users => setUsers(Object.values(users.val())));
		setTransactions('fromUser', auth.currentUser?.email);
	}, []);

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			<View style={globalStyles.transactionContainer}>
				<TransactionInput
					placeholder={'user email'}
					title={'To whom to transfer:'}
					value={user}
					onChangeValue={addUsersToUsersList}
				/>
				<TransactionInputList
					data={currentUsers}
					selectUser={handleChangeUserList}
				/>
				<TransactionInput
					placeholder={'0'}
					title={'Transfer amount:'}
					keyboardType={'numeric'}
					value={value}
					onChangeValue={handleChangeValue}
				/>
				<Button
					onPressButton={sendTransaction}
					text={'Send'}
				/>

				<Text style={globalStyles.translationHistTitle}>History</Text>
				<View style={globalStyles.translationListContainer}>
					<View style={globalStyles.translationHistButtons}>
						<TransactionHistoryButtons
							setFrom={setTransactionsFromUser}
							setTo={setTransactionsToUser}
						/>
					</View>
					{
						histValues ? (
							<FlatList
								style={globalStyles.transactionHistList}
								data={histValues}
								renderItem={({item}) => <TransactionHistItem data={item}/>}
								keyExtractor={keyExtractor}
							/>
						) : (
							<View style={globalStyles.transactionNoData}>
								<Text>No transactions</Text>
							</View>
						)
					}
				</View>
			</View>
		</TouchableWithoutFeedback>
	)
}

export default Transactions;
