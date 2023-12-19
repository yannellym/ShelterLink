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
export declare type UserFavoritePetUpdateFormInputValues = {
    userId?: string;
    petId?: string;
    createdAt?: string;
};
export declare type UserFavoritePetUpdateFormValidationValues = {
    userId?: ValidationFunction<string>;
    petId?: ValidationFunction<string>;
    createdAt?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type UserFavoritePetUpdateFormOverridesProps = {
    UserFavoritePetUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    userId?: PrimitiveOverrideProps<TextFieldProps>;
    petId?: PrimitiveOverrideProps<TextFieldProps>;
    createdAt?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type UserFavoritePetUpdateFormProps = React.PropsWithChildren<{
    overrides?: UserFavoritePetUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    userFavoritePet?: any;
    onSubmit?: (fields: UserFavoritePetUpdateFormInputValues) => UserFavoritePetUpdateFormInputValues;
    onSuccess?: (fields: UserFavoritePetUpdateFormInputValues) => void;
    onError?: (fields: UserFavoritePetUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: UserFavoritePetUpdateFormInputValues) => UserFavoritePetUpdateFormInputValues;
    onValidate?: UserFavoritePetUpdateFormValidationValues;
} & React.CSSProperties>;
export default function UserFavoritePetUpdateForm(props: UserFavoritePetUpdateFormProps): React.ReactElement;
