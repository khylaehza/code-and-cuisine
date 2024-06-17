// import { CusIconBtn } from './CusButton';
import { DownloadOutlined } from '@mui/icons-material';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import CusButton from './CusButton';
import { PrintOutlined } from '@mui/icons-material';
const CusDownload = ({ anchorEl, handleClick }) => {
	const open = Boolean(anchorEl);

	return (
		<CusButton
			variant={'secondary'}
			label={'Print'}
			icon={<PrintOutlined />}
			action={handleClick}
		/>
	);
};

export default CusDownload;
