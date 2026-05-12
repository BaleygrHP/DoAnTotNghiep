import React from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import QuantityField from 'components/web/form/QuantityField/index';

AddToCart.propTypes = {
  onSubmit: PropTypes.func,
  soldOut: PropTypes.bool,
};

function AddToCart(props) {
  const { soldOut, onSubmit } = props;
  const form = useForm({
    defaultValues: {
      quantity: 1,
    },
  });

  const handleSubmit = async (values) => {
    if (onSubmit) {
      await onSubmit(values);
    }
  };

  return (
    <div>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <div className="u-hidden">
          <QuantityField name="quantity" label="Quantity" form={form} value={1} />
        </div>
        <button type="submit" disabled={soldOut} title="Add to cart" value="Add to cart" className="form-button button--full add-to-cart disabled">
          Thêm vào giỏ hàng
        </button>
      </form>
    </div>
  );
}

export default AddToCart;
