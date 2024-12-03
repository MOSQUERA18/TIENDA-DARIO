
import '../CSS/ProductCard.css';

const ProductCard = ({ name, price, imgSrc }) => {
    return (
        <div className="product-card">
            <img className="product-image" src={imgSrc} alt={name} />
            <h2 className="product-name">{name}</h2>
            <p className="product-price">${price}</p>
        </div>
    );
};

export default ProductCard;
