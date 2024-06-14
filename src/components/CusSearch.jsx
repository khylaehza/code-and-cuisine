import * as React from 'react';

import { Search } from '@mui/icons-material';
import { InputAdornment, Input } from '@mui/material';

const CusSearch = ({ setCurSearch, curSearch, label = 'name' }) => {
	return (
		<Input
			placeholder={`Search by ${label}`}
			inputProps={{ 'aria-label': 'search' }}
			disableUnderline
			sx={{
				paddingY: 1,
				paddingX: 2,
				textAlign: 'left',
				width: '100%',
			}}
			startAdornment={
				<InputAdornment position="start">
					<Search
						sx={{
							color: '#CBD1DC',
							fontSize: 20,
						}}
					/>
				</InputAdornment>
			}
			onChange={(e) => {
				setCurSearch(e.target.value);
			}}
			value={curSearch}
		/>
	);
};

export default CusSearch;
