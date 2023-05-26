export default interface IDeliveryInfo {
      [key : string]: {
            code: string,
            company: string,
            createdAt: string,
            extraInfo: string | null,
            id: number,
            link: string,
            orderId: number,
            updatedAt: string,
      } | null
}
