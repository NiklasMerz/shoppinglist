/**
 * 
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { ReceiptLineItems } from './receiptLineItems';


export interface Receipt { 
    readonly id?: number;
    readonly time?: string;
    trip: number;
    total?: string | null;
    readonly line_items?: Array<ReceiptLineItems>;
}
