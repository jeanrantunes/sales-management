import { isDateValid } from '../../helpers/date';
import { OperationType } from '../sales.enum';

export const extractOperationType = (line: string) => {
    const possibleOperationType = parseInt(line.slice(0, 1))
    const operationTypes = Object.values(OperationType)

    if (!operationTypes.includes(possibleOperationType)) {
        throw new Error("Operation type is not valid");
    }
    return possibleOperationType
}

export const extractOperationDate = (line: string) => {
    const operationDate = line.slice(1, 26)

    if (!isDateValid(new Date(operationDate))) {
        throw new Error("Operation date is not valid");
    }

    return operationDate
}

export const extractProductDescription = (line: string) => {
    const productDescription = line.slice(26, 56)?.trim()

    if (!productDescription) {
        throw new Error("Missing product description");
    }

    return productDescription
}

export const extractProductPrice = (line: string) => {
    const price = Number(line.slice(56, 66))

    if (isNaN(price)) {
        throw new Error("Product price is not valid");
    }

    return price
}

export const extractSellerName = (line: string) => {
    const seller = line.slice(66, 86)

    if (!seller) {
        throw new Error("Seller is missing");
    }

    return seller
}