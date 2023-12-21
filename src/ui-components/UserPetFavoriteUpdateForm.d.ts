/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
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
export declare type UserPetFavoriteUpdateFormInputValues = {
    userId?: string;
    petId?: string;
    createdAt?: string;
};
export declare type UserPetFavoriteUpdateFormValidationValues = {
    userId?: ValidationFunction<string>;
    petId?: ValidationFunction<string>;
    createdAt?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type UserPetFavoriteUpdateFormOverridesProps = {
    UserPetFavoriteUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    userId?: PrimitiveOverrideProps<TextFieldProps>;
    petId?: PrimitiveOverrideProps<TextFieldProps>;
    createdAt?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type UserPetFavoriteUpdateFormProps = React.PropsWithChildren<{
    overrides?: UserPetFavoriteUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    userPetFavorite?: any;
    onSubmit?: (fields: UserPetFavoriteUpdateFormInputValues) => UserPetFavoriteUpdateFormInputValues;
    onSuccess?: (fields: UserPetFavoriteUpdateFormInputValues) => void;
    onError?: (fields: UserPetFavoriteUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: UserPetFavoriteUpdateFormInputValues) => UserPetFavoriteUpdateFormInputValues;
    onValidate?: UserPetFavoriteUpdateFormValidationValues;
} & React.CSSProperties>;
export default function UserPetFavoriteUpdateForm(props: UserPetFavoriteUpdateFormProps): React.ReactElement;
