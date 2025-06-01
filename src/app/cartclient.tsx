export async function getCart() {
  const res = await fetch("/api/cart", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store", // prevent caching if needed
  });

  if (!res.ok) {
    throw new Error("Failed to fetch cart");
  }

  return res.json();
}

export async function deleteCartItem(itemId: string) {
  const res = await fetch(`/api/cart/item/${itemId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Failed to delete cart item");
  }

  return res.json();
}
