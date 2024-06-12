import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ProductsPage, OrderPage, DashboardPage } from './pages';

const RoutesNav = () => {
	return (
		<Router>
			<Routes>
				<Route
					path="/products"
					element={<ProductsPage />}
				/>
				<Route
					path="/order"
					element={<OrderPage />}
				/>
				<Route
					path="/"
					index
					element={<DashboardPage />}
				/>
			</Routes>
		</Router>
	);
};

export default RoutesNav;
