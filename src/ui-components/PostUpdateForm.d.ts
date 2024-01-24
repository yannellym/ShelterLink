/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SwitchFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
export declare type EscapeHatchProps = {
    [elementHierarchy: string]: Record<string, unknown>;
} | null;
export declare type VariantValues = {
    [key: string]: string;
};
export declare type Variant = {
    variantValues: VariantValues;
    overrides: EscapeHatchProps;
};
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type PostUpdateFormInputValues = {
    subject?: string;
    content?: string;
    user?: string;
    username?: string;
    topicID?: string;
    createdAt?: string;
    Favorited?: boolean;
    likes?: number;
    likedBy?: string[];
    replies?: string[];
    image?: string;
};
export declare type PostUpdateFormValidationValues = {
    subject?: ValidationFunction<string>;
    content?: ValidationFunction<string>;
    user?: ValidationFunction<string>;
    username?: ValidationFunction<string>;
    topicID?: ValidationFunction<string>;
    createdAt?: ValidationFunction<string>;
    Favorited?: ValidationFunction<boolean>;
    likes?: ValidationFunction<number>;
    likedBy?: ValidationFunction<string>;
    replies?: ValidationFunction<string>;
    image?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type PostUpdateFormOverridesProps = {
    PostUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    subject?: PrimitiveOverrideProps<TextFieldProps>;
    content?: PrimitiveOverrideProps<TextFieldProps>;
    user?: PrimitiveOverrideProps<TextFieldProps>;
    username?: PrimitiveOverrideProps<TextFieldProps>;
    topicID?: PrimitiveOverrideProps<TextFieldProps>;
    createdAt?: PrimitiveOverrideProps<TextFieldProps>;
    Favorited?: PrimitiveOverrideProps<SwitchFieldProps>;
    likes?: PrimitiveOverrideProps<TextFieldProps>;
    likedBy?: PrimitiveOverrideProps<TextFieldProps>;
    replies?: PrimitiveOverrideProps<TextFieldProps>;
    image?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type PostUpdateFormProps = React.PropsWithChildren<{
    overrides?: PostUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    post?: any;
    onSubmit?: (fields: PostUpdateFormInputValues) => PostUpdateFormInputValues;
    onSuccess?: (fields: PostUpdateFormInputValues) => void;
    onError?: (fields: PostUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: PostUpdateFormInputValues) => PostUpdateFormInputValues;
    onValidate?: PostUpdateFormValidationValues;
} & React.CSSProperties>;
export default function PostUpdateForm(props: PostUpdateFormProps): React.ReactElement;
