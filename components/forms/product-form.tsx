"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Field,
    FieldContent,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    InputGroupTextarea,
} from "@/components/ui/input-group";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectSeparator,
    SelectTrigger,
    SelectValue,
} from "../ui/select";
import ImageUpload from "../file-upload/image-upload";
import { uploadImageToServer } from "@/lib/data/upload-file";
import { createProduct } from "@/lib/data/create-product";
import axios from "axios";

interface ImageFile {
    id: string;
    file: File;
    preview: string;
    progress: number;
    status: "uploading" | "completed" | "error";
    error?: string;
}

// const categories = [
//     { label: "Clothes", value: 1 },
//     { label: "Electronics", value: 2 },
//     { label: "Furniture", value: 3 },
// ] as const;

type Category = {
    id: number;
    name: string;
    slug: string;
    image: string;
};

const baseAPI = process.env.NEXT_PUBLIC_API;

const formSchema = z.object({
    title: z
        .string()
        .min(5, "Product title must be at least 5 characters.")
        .max(32, "Product title must be at most 32 characters."),
    description: z
        .string()
        .min(20, "Description must be at least 20 characters.")
        .max(100, "Description must be at most 100 characters."),
    price: z.coerce.number().positive(),
    categoryId: z.coerce.number().int().positive(),
    image: z.array(z.string().url()).optional(),
});

export async function getCategories() {
    return axios.get(`${baseAPI}/api/v1/categories`);
}

export function ProductForm() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            description: "",
            price: 0,
            image: [],
        },
    });

    // function onSubmit(data: z.infer<typeof formSchema>) {
    //     toast("You submitted the following values:", {
    //         description: (
    //             <pre className="bg-code text-code-foreground mt-2 w-[320px] overflow-x-auto rounded-md p-4">
    //                 <code>{JSON.stringify(data, null, 2)}</code>
    //             </pre>
    //         ),
    //         position: "bottom-right",
    //         classNames: {
    //             content: "flex flex-col gap-2",
    //         },
    //         style: {
    //             "--border-radius": "calc(var(--radius)  + 4px)",
    //         } as React.CSSProperties,
    //     });
    // }

    // const onhandleImageChange = async (images: ImageFile[]) => {
    //     const formData = new FormData();
    //     for (const image of images) {
    //         formData.append("file", image.file);
    //         const res = await uploadImageToServer(formData);
    //         console.log(res);
    //     }
    // };

    async function onSubmit(data: z.infer<typeof formSchema>) {
        try {
            const fd = new FormData();
            selectedImages.forEach((img) => fd.append("file", img.file));

            const uploadRes = await uploadImageToServer(fd);
            const uploaded = uploadRes.data;
            const imageUrls: string[] = Array.isArray(uploaded)
                ? uploaded.map((x) => x.location)
                : [uploaded.location];

            const payload = {
                title: data.title,
                price: data.price,
                description: data.description,
                categoryId: data.categoryId,
                images: imageUrls,
            };

            const created = await createProduct(payload);

            toast.success("Created product", {
                description: created.data.title,
            });
            form.reset();
            setSelectedImages([]);
        } catch (e: unknown) {
            toast.error(e?.response?.data?.message ?? "Create product failed");
        }
    }

    const [selectedImages, setSelectedImages] = React.useState<ImageFile[]>([]);

    const onhandleImageChange = (images: ImageFile[]) => {
        setSelectedImages(images);
    };

    const [categories, setCategories] = React.useState<Category[]>([]);

    React.useEffect(() => {
        getCategories().then((res) => setCategories(res.data));
    }, []);

    return (
        <Card className="w-full sm:max-w-md">
            <CardHeader>
                <CardTitle>Product Report</CardTitle>
                <CardDescription>
                    Help us improve by reporting Products you encounter.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
                    <FieldGroup>
                        <Controller
                            name="title"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="form-rhf-demo-title">
                                        Product Title
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id="form-rhf-demo-title"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="Login button not working on mobile"
                                        autoComplete="off"
                                    />
                                    {fieldState.invalid && (
                                        <FieldError
                                            errors={[fieldState.error]}
                                        />
                                    )}
                                </Field>
                            )}
                        />
                        <Controller
                            name="price"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="form-rhf-demo-title">
                                        Product price
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id="form-rhf-demo-title"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="Login button not working on mobile"
                                        autoComplete="off"
                                        type="number"
                                    />
                                    {fieldState.invalid && (
                                        <FieldError
                                            errors={[fieldState.error]}
                                        />
                                    )}
                                </Field>
                            )}
                        />
                        <Controller
                            name="description"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="form-rhf-demo-description">
                                        Description
                                    </FieldLabel>
                                    <InputGroup>
                                        <InputGroupTextarea
                                            {...field}
                                            id="form-rhf-demo-description"
                                            placeholder="I'm having an issue with the login button on mobile."
                                            rows={6}
                                            className="min-h-24 resize-none"
                                            aria-invalid={fieldState.invalid}
                                        />
                                        <InputGroupAddon align="block-end">
                                            <InputGroupText className="tabular-nums">
                                                {field.value.length}/100
                                                characters
                                            </InputGroupText>
                                        </InputGroupAddon>
                                    </InputGroup>
                                    <FieldDescription>
                                        Include steps to reproduce, expected
                                        behavior, and what actually happened.
                                    </FieldDescription>
                                    {fieldState.invalid && (
                                        <FieldError
                                            errors={[fieldState.error]}
                                        />
                                    )}
                                </Field>
                            )}
                        />
                        <Controller
                            name="categoryId"
                            control={form.control}
                            render={({ field }) => (
                                <Select
                                    value={
                                        field.value ? String(field.value) : ""
                                    }
                                    onValueChange={(v) =>
                                        field.onChange(Number(v))
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select category" />
                                    </SelectTrigger>

                                    <SelectContent>
                                        {categories.map((cat) => (
                                            <SelectItem
                                                key={cat.id}
                                                value={String(cat.id)}
                                            >
                                                {cat.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            )}
                        />

                        <Controller
                            name="image"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field
                                    orientation="responsive"
                                    data-invalid={fieldState.invalid}
                                >
                                    <FieldContent>
                                        <ImageUpload
                                            onImagesChange={onhandleImageChange}
                                        />

                                        {fieldState.invalid && (
                                            <FieldError
                                                errors={[fieldState.error]}
                                            />
                                        )}
                                    </FieldContent>
                                </Field>
                            )}
                        />
                    </FieldGroup>
                </form>
            </CardContent>
            <CardFooter>
                <Field orientation="horizontal">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => form.reset()}
                    >
                        Reset
                    </Button>
                    <Button type="submit" form="form-rhf-demo">
                        Submit
                    </Button>
                </Field>
            </CardFooter>
        </Card>
    );
}
