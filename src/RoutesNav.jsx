import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ProductsPage, OrderPage, DashboardPage } from './pages';

const RoutesNav = () => {
	return (
		<Router>
			<Routes>
				<Route
					path="/products"
					index
					element={<ProductsPage />}
				/>
				<Route
					path="/order"
					element={<OrderPage />}
				/>
				<Route
					path="/"
					element={<DashboardPage />}
				/>
				<Route
					path="*"
					element={
						<div
							style={{
								color: 'black',
								display: 'flex',
								alignItems: 'center',
							}}
						>
							Page Not Found
						</div>
					}
				/>
			</Routes>
		</Router>
	);
};

export default RoutesNav;
