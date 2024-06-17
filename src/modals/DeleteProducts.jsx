import { CusAlert } from '../components';
import { db, storage } from '../../firebase-config';
import { ref, remove } from 'firebase/database';
import { ref as storeRef, deleteObject } from 'firebase/storage';
import { useData } from '../DataContext';
const DeleteProducts = ({
	setOpenDel,
	openDel,
	setVariant,
	setMessage,
	setOpenToast,
}) => {
	const { curRow } = useData();
	const handleDelete = () => {
		const dataRef = ref(db, `/products/${curRow.id}`);
		const imageRef = storeRef(storage, `products/${curRow.id}`);

		remove(dataRef)
			.then(() => {
				deleteObject(imageRef)
					.then(() => {
						console.log('Deleted successfully');
						setVariant('success');
						setMessage('Product deleted successfully.');
						setOpenToast(true);
					})
					.catch((error) => {
						console.error('Error deleting image:', error);
					});
			})
			.catch((error) => {
				setVariant('error');
				setMessage(error);
				setOpenToast(true);
			});

		setOpenDel(false);
	};
	return (
		<CusAlert
			setOpen={setOpenDel}
			open={openDel}
			name={curRow.name}
			handleDelete={handleDelete}
		/>
	);
};

export default DeleteProducts;
