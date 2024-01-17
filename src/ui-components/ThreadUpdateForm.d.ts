/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps } from "@aws-amplify/ui-react";
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
export declare type ThreadUpdateFormInputValues = {};
export declare type ThreadUpdateFormValidationValues = {};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ThreadUpdateFormOverridesProps = {
    ThreadUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
} & EscapeHatchProps;
export declare type ThreadUpdateFormProps = React.PropsWithChildren<{
    overrides?: ThreadUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    thread?: any;
    onSubmit?: (fields: ThreadUpdateFormInputValues) => ThreadUpdateFormInputValues;
    onSuccess?: (fields: ThreadUpdateFormInputValues) => void;
    onError?: (fields: ThreadUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ThreadUpdateFormInputValues) => ThreadUpdateFormInputValues;
    onValidate?: ThreadUpdateFormValidationValues;
} & React.CSSProperties>;
export default function ThreadUpdateForm(props: ThreadUpdateFormProps): React.ReactElement;
