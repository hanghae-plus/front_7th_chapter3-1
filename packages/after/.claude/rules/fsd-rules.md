## Standard Roles in Each Slice
```jsx
slice/
  ├── api/     // Data fetching
  ├── config/  // Constants, configurations
  ├── model/   // Business logic, types, state
  ├── lib/     // Utils, helpers
  └── ui/      // Visual components
```

## Layer-Specific Conventions

### Entity Layer
```jsx
entities/product/
  api/    // axios, fetch basic CRUD operations
  config/ // Entity configurations, e.g., MAX_POST_LENGTH
  model/  // Pure business logic + types
  lib/    // Entity-specific utilities, e.g., removeItem
  ui/     // Read-only presentational components
```

**Rules**

- All functions must be pure (same input = same output)
- No side effects
- No state management
- No external dependencies
- Focus on data transformation with own schema
- Reusable across different features
- Testable with pure unit tests
- `ui`: Pure presentational components
- `model`: Contains pure functions, business logic, and type definitions

Key Point: pure!

**Example**

✅ Good

```jsx
// entities/product/model/validation.ts
export const isValidProduct = (product: Product): boolean => {
  return product.price > 0 && product.stock >= 0;
};
```


❌ Bad
```jsx
// Impure function with side effects
export const updateProductPrice = (product: Product, newPrice: number) => {
  product.price = newPrice;  // Mutation!
  api.updateProduct(product); // Side effect!
};
```

### Features Layer

**Components to Include**
1. Main action component
2. All related form inputs
3. All supporting UI elements

**Rules**

1. One Feature = One Primary User Action
- Include one primary user action
- Include all supporting UI elements
- All related form inputs belong together

2. Hook-Based Logic
- Business logic lives in hooks
- Each hook has single responsibility

3. Props Guidelines
- Accept only domain data
- No event handler props
- No UI configuration props

**Examples**

✅ Good Example

Primary user action + Domain Props + hooks

```jsx
// features/addToCart/ui/AddToCartButton.tsx
export const AddToCartButton = ({ product }: { product: Product }) => {
  const { handleAddToCart, isLoading } = useAddToCart();

  return (
    <Button onClick={() => handleAddToCart(product)} disabled={isLoading}>
      Add to Cart
    </Button>
  );
};

// features/addToCart/model/useAddToCart.ts
export const useAddToCart = () => {
  const { mutate, isLoading } = useAddToCartMutation();

  const handleAddToCart = (product: Product) => {
    mutate(product.id);
  };

  return { handleAddToCart, isLoading };
};
```

✅ Good Example 2: Action with Input State

All related form inputs + All supporting UI elements

```jsx
// features/addComment/ui/AddCommentForm.tsx
export const AddCommentForm = ({ productId }: { productId: string }) => {
  const [comment, setComment] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;

    api.addComment(productId, comment);
    setComment("");
  };

  return (
    <Form onSubmit={handleSubmit}>
      <TextArea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Write a comment..."
      />
      <Button type="submit">Add Comment</Button>
    </Form>
  );
};
```

❌ Bad Examples

Many Props with Event Handlers

```jsx
// ❌ Bad Example 1: Too Many Responsibilities
// features/product/ui/ProductActions.tsx
export const ProductActions = ({
  product,
  onAddToCart,  // Receiving handlers as props
  onWishlist,    // Should handle internally
  theme,         // UI config props
  className      // Style props
}) => {
  return (
    <div className={className}>
      <Button onClick={() => onAddToCart(product)} theme={theme}>
        Add to Cart
      </Button>

      <Button onClick={() => onWishlist(product)}>
        Wishlist
      </Button>
    </div>
  );
};

```


Feature Has No User Action

```jsx
// ❌ Bad Example 2: No Handler (Should be in Entity or Widget)
// features/product/ui/ProductPrice.tsx
export const ProductPrice = ({ price }: { price: number }) => {
  return (
    <div className="text-lg">
      ${price.toFixed(2)}
    </div>
  );
};
```

### Widgets Layer

```jsx
widgets/header/
  api/    // Widget-specific APIs
  config/ // Widget configurations
  model/  // Types + minimal logic
  lib/    // Widget-specific utilities
  ui/     // Composition of features
```

**Rules**

- Compose features; avoid own handlers
- Only domain data as props
- Or no props at all

### Pages Layer
```jsx
pages/main/
  api/    // Page-specific data
  config/ // Page configurations
  lib/    // Page-specific utilities
  model/  // Routes + types
  ui/     // Page composition
```

## Props Guidelines

### For shared/ui ONLY:
- Can accept event handlers
- Can accept styling props
- Can accept configuration props

### For All Other Components:

✅ Good

```jsx
// Accept only domain data
const ProductCard = ({ product }) => { ... }
```

❌ Bad

```jsx
// Avoid event handlers and styling/configuration props
const ProductCard = ({ product, onAddToCart, onWishlist }) => { ... }
```

- Accept only domain data
- Avoid event handlers
- Avoid configuration props
- Avoid styling props