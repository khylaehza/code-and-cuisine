import { createContext, useState, useContext, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { db } from '../firebase-config';

const DataContext = createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
	const [loading, setLoading] = useState(true);
	const [products, setProducts] = useState([]);
	const [curRow, setCurRow] = useState([]);

	useEffect(() => {
		const table = ref(db, 'products');
		const unsubscribe = onValue(
			table,
			(snapshot) => {
				if (snapshot.exists()) {
					const data = Object.entries(snapshot.val()).map(
						([key, value]) => {
							return { key, ...value };
						}
					);
					setProducts(data);
				} else {
					console.log('No data available');
					setProducts([{}]);
				}
				setLoading(false);
			},
			(error) => {
				console.error('Error fetching data:', error);
				setLoading(false);
			}
		);

		return () => unsubscribe();
	}, []);

	return (
		<DataContext.Provider value={{ products, setCurRow, curRow }}>
			{loading ? <p>Loading...</p> : children}
		</DataContext.Provider>
	);
};
