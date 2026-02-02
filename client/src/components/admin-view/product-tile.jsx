import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";

function AdminProductTile({
  product,
  setFormData,
  setOpenCreateProductsDialog,
  setCurrentEditedId,
  handleDelete,
}) {
  return (
    <Card className="w-full max-w-sm mx-auto flex flex-col justify-between">
      <div>
        <div className="relative">
          <img
            src={product?.image || "https://via.placeholder.com/300"} // Fallback image
            alt={product?.title}
            className="w-full h-[300px] object-cover rounded-t-lg"
            onError={(e) => { e.target.src = "https://via.placeholder.com/300"; }}
          />
        </div>
        <CardContent>
          <h2 className="text-xl font-bold mb-2 mt-2 truncate">{product?.title}</h2>
          <div className="flex justify-between items-center mb-2">
            <span className={`${product?.salePrice > 0 ? "line-through text-muted-foreground" : ""} text-lg font-semibold text-primary`}>
              ₹{product?.price}
            </span>
            {product?.salePrice > 0 && (
              <span className="text-lg font-bold text-primary">₹{product?.salePrice}</span>
            )}
          </div>
        </CardContent>
      </div>
      <CardFooter className="flex justify-between items-center gap-2">
        <Button
          className="flex-1"
          onClick={() => {
            setOpenCreateProductsDialog(true);
            setCurrentEditedId(product?._id);
            setFormData(product);
          }}
        >
          Edit
        </Button>
        <Button variant="destructive" className="flex-1" onClick={() => handleDelete(product?._id)}>
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
}

export default AdminProductTile;