import { Box, Card, CardContent, InputAdornment, SvgIcon, TextField } from '@material-ui/core';
import { unwrapResult } from '@reduxjs/toolkit';
import { Search as SearchIcon } from 'react-feather';
import { useDispatch, useSelector } from 'react-redux';
import CategoryCNewForm from 'components/admin/form/categoryChild/CategoryCNewForm';
import { createNewCategoryCAdmin, updateImageAdmin } from 'slice/CategoryChildSlice';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import Loader from 'components/fullPageLoading';

function CategoryChildListToolbar(props) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const { data, setSubCategoryList } = props;

  const handleChange = (event) => {
    const query = event.target.value.toLowerCase();
    const filterSuggestions = data.filter((item) => item.namesubCategory.toLowerCase().indexOf(query) > -1);
    setSubCategoryList(filterSuggestions);
  };

  const dataCategoryList = useSelector((state) => state.categoryList.dataA);

  const handleNewCategoryCFormSubmit = async (values, dataImage) => {
    try {
      setLoading(true);
      values.categoryID = parseInt(values.categoryID);

      const action = createNewCategoryCAdmin(values);
      const resultAction = await dispatch(action);
      const createdCategory = unwrapResult(resultAction);

      if (dataImage) {
        const actionImage = updateImageAdmin({
          _id: createdCategory._id,
          data: dataImage,
        });
        const resultActionImage = await dispatch(actionImage);
        unwrapResult(resultActionImage);
      }

      enqueueSnackbar('Them thanh cong', { variant: 'success' });
    } catch (error) {
      console.log(error);
      enqueueSnackbar(error.message, { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Loader showLoader={loading} />
      <Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <CategoryCNewForm category={dataCategoryList} onSubmit={handleNewCategoryCFormSubmit} />
        </Box>
        <Box sx={{ mt: 3 }}>
          <Card>
            <CardContent>
              <Box>
                <TextField
                  fullWidth={true}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SvgIcon fontSize="small" color="action">
                          <SearchIcon />
                        </SvgIcon>
                      </InputAdornment>
                    ),
                  }}
                  placeholder="Tim kiem"
                  variant="outlined"
                />
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </>
  );
}

export default CategoryChildListToolbar;
