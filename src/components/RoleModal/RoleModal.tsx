import { Modal, Backdrop, Fade, Box, Typography, FormControl, FormHelperText, OutlinedInput, Stack, Button } from '@mui/material';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { useEffect, useState } from 'react';
import { store } from '../../store/store';
import { observer } from 'mobx-react-lite';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseSharpIcon from '@mui/icons-material/CloseSharp';
import { colors } from '../../constants/colors';

interface IProps {
	open: boolean;
	setOpen: (open: boolean) => void;
	isTablet: boolean;
}
const RoleModal: React.FC<IProps> = ({ open, setOpen, isTablet }) => {
	interface IDataValue {
		name: string;
		file?: File;
	}
	interface IErrors {
		name: string;
		file?: string;
	}
	const [dataValue, setDataValue] = useState<IDataValue>({ name: '' });
	const [sendFetch, setSendFetch] = useState(false);

	const { user, document } = store;
	const [errors, setErrors] = useState<IErrors>({ name: '', file: undefined });
	const onValidate = (value: string | File | undefined, type: string) => {
		switch (type) {
			case 'name':
				if (!value) setErrors((oldErrors) => ({ ...oldErrors, name: 'Поле обязательно для заполнения' }));
				else if (!/^[a-zA-Zа-яА-Я0-9-_]+(\s+[a-zA-Zа-яА-Я0-9]+)*$/i.test(value as string)) {
					setErrors((oldErrors) => ({ ...oldErrors, name: 'Некорректная название' }));
				} else if (!((value as string).length >= 3)) setErrors((oldErrors) => ({ ...oldErrors, name: 'Название должен содержать не менее 3 символов' }));
				else setErrors((oldErrors) => ({ ...oldErrors, name: '' }));
				break;
			case 'idSection':
				if (!value) setErrors((oldErrors) => ({ ...oldErrors, idSection: 'Поле обязательно для заполнения' }));
				else setErrors((oldErrors) => ({ ...oldErrors, idSection: '' }));
				break;
			case 'file':
				if (!value) setErrors((oldErrors) => ({ ...oldErrors, file: 'Поле обязательно для заполнения' }));
				else setErrors((oldErrors) => ({ ...oldErrors, file: '' }));
				break;
			default:
				break;
		}
	};
	const onChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { files } = e.target;
		if (files?.length) {
			const formData = new FormData();
			formData.append('file', files[0]);
			setDataValue({ ...dataValue, file: files[0] });
		}
	};

	const validateAllInputs = () => {
		Object.entries(errors).forEach(([key, value]) => {
			onValidate(dataValue[key as keyof IDataValue], key);
		});
	};

	const onChangeValue = (value: string, type: string) => {
		switch (type) {
			case 'name':
				setDataValue({ ...dataValue, name: value });
				onValidate(value, type);
				break;
		}
	};
	function addRole() {
		validateAllInputs();
		setSendFetch(true);
	}

	const deleteFile = () => {
		setDataValue({ ...dataValue, file: undefined });
	};

	useEffect(() => {
		if (!errors.name && !errors.file && Object.values(dataValue).every(Boolean)) {
			user
				.addRole(dataValue.name, dataValue.file as File)
				.then(() => setOpen(false))
				.then(() => {
          document.getListMatrix()
		  user.getRolesAll()
          setDataValue({ name: '', file: undefined });
          setErrors({ name: '', file: undefined });
          setSendFetch(false);
        });
		} else {
			setSendFetch(false);
		}
	}, [sendFetch]);

	return (
		<Modal
			open={open}
			onClose={() => setOpen(false)}
			closeAfterTransition
			slots={{ backdrop: Backdrop }}
			slotProps={{
				backdrop: {
					timeout: 500,
				},
			}}
		>
			<Fade in={open}>
				<Box
					sx={{
						position: 'absolute',
						top: '50%',
						left: '50%',
						transform: 'translate(-50%, -50%)',
						width: isTablet ? '100%' : 750,
						bgcolor: 'background.paper',
						boxShadow: 24,
						px: isTablet ? 2 : 5,
						py: isTablet ? 2 : 4,
					}}
				>
					<Stack display={'flex'} justifyContent={'space-between'} direction={'row'}>
						<Typography variant='h2' component='h2' paddingBottom={3}>
							Добавить роль
						</Typography>
						<CloseSharpIcon onClick={() => setOpen(false)} fontSize='medium' sx={{ cursor: 'pointer' }} />
					</Stack>
					<FormControl fullWidth>
						<Stack spacing={isTablet ? 1 : 0.5} paddingBottom={0.5}>
							<Typography variant='h5'>Название роли*</Typography>
							<OutlinedInput
								placeholder='Введите название роли'
								value={dataValue.name}
								onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChangeValue(e.target.value, 'name')}
								required
							/>
						</Stack>
						<FormHelperText error component={'div'}>
							<Typography variant='subtitle1' color={'error'} paddingBottom={1}>
								{errors.name}
							</Typography>
						</FormHelperText>
					</FormControl>

					{!dataValue.file ? (
						<Box>
							<input color='primary' accept='image/*' type='file' onChange={onChangeFile} id='icon-button-file' style={{ display: 'none' }} />
							<label htmlFor='icon-button-file'>
								<Button
									variant='contained'
									component='span'
									size='large'
									color='secondary'
									sx={{
										height: 78,
										width: '100%',
										borderRadius: '16px',
										border: `1px dashed ${colors.gray30}`,
										boxShadow: 'none',
										display: 'flex',
										flexDirection: 'column',
										py: 1.5,
										'&:hover': {
											backgroundColor: colors.gray20,
											boxShadow: 'none',
										},
									}}
								>
									<Box display={'flex'} alignItems={'center'} gap={1}>
										<AttachFileIcon sx={{ fontSize: 19, transform: 'rotate(45deg)' }} />
										<Typography variant='h6'>Прикрепить изображение</Typography>
									</Box>
									<Typography variant='h6' color={`${colors.gray30}`}>
										Только изображения
									</Typography>
								</Button>
							</label>
							<FormHelperText error component={'div'} >
								<Typography  variant='subtitle1' color={'error'} paddingBottom={1} ml={1.4}>
									{errors.file}
								</Typography>
							</FormHelperText>
						</Box>
					) : (
						<Stack display={'flex'} flexDirection={'row'} gap={1} justifyContent={'space-between'}>
							<Box display={'flex'} flexDirection={'row'} gap={1}>
								<InsertDriveFileIcon fontSize='large' />
								<Typography variant='subtitle1' paddingBottom={1}>
									{dataValue.file.name}
								</Typography>
							</Box>
							<DeleteIcon fontSize='large' sx={{ cursor: 'pointer' }} onClick={deleteFile} />
						</Stack>
					)}
					<Button variant='contained' sx={{ width: '100%', mt: isTablet ? 2 : 3 }} onClick={addRole}>
						{' '}
						Добавить
					</Button>
				</Box>
			</Fade>
		</Modal>
	);
};

export default observer(RoleModal);
