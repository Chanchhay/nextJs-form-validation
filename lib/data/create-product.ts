import axios from "axios";

const baseAPI = process.env.NEXT_PUBLIC_API;

export type CreateProductPayload = {
    title: string;
    price: number;
    description: string;
    categoryId: number;
    images: string[];
};

export async function createProduct(payload: CreateProductPayload) {
    return axios.post(`${baseAPI}/api/v1/products`, payload, {
        headers: { "Content-Type": "application/json" },
    });
}
