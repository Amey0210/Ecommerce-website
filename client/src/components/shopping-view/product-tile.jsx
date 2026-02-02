import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { brandOptionsMap, categoryOptionsMap } from "@/config";
import { Badge } from "../ui/badge";

function ShoppingProductTile({
  product,
  handleGetProductDetails,
  handleAddtoCart,
}) {
  return (
    <Card className="w-full max-w-sm mx-auto flex flex-col justify-between">
      <div onClick={() => handleGetProductDetails(product?._id)} className="cursor-pointer">
        <div className="relative">
          <img
            src={product?.image || "https://via.placeholder.com/300?text=No+Image"}
            alt={product?.title}
            className="w-full h-[300px] object-cover rounded-t-lg transition-all hover:scale-105"
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/300?text=Image+Not+Found";
            }}
          />
          {product?.totalStock === 0 ? (
            <Badge className="absolute top-2 left-2 bg-red-600">
              Out Of Stock
            </Badge>
          ) : product?.totalStock < 10 ? (
            <Badge className="absolute top-2 left-2 bg-orange-500">
              {`Only ${product?.totalStock} items left`}
            </Badge>
          ) : product?.salePrice > 0 ? (
            <Badge className="absolute top-2 left-2 bg-primary">
              Sale
            </Badge>
          ) : null}
        </div>
        <CardContent className="p-4">
          <h2 className="text-xl font-bold mb-2 truncate">{product?.title}</h2>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-muted-foreground">
              {categoryOptionsMap[product?.category]}
            </span>
            <span className="text-sm text-muted-foreground">
              {brandOptionsMap[product?.brand]}
            </span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span
              className={`${
                product?.salePrice > 0 ? "line-through text-muted-foreground" : ""
              } text-lg font-semibold text-primary`}
            >
              ${product?.price}
            </span>
            {product?.salePrice > 0 ? (
              <span className="text-lg font-semibold text-primary">
                ${product?.salePrice}
              </span>
            ) : null}
          </div>
        </CardContent>
      </div>
      <CardFooter className="p-4">
        {product?.totalStock === 0 ? (
          <Button className="w-full opacity-60 cursor-not-allowed" disabled>
            Out Of Stock
          </Button>
        ) : (
          <Button
            onClick={() => handleAddtoCart(product?._id, product?.totalStock)}
            className="w-full"
          >
            Add to cart
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

export default ShoppingProductTile;