import Cache from './Cache'
export interface HttpRequest extends RequestInit {
	url?: string
	query?: {}
	expiration?: number
}

export interface HttpResponse extends Response {
	traceId?: string
}

class Http {
	private readonly TWELWE_HOURS_IN_MINUTE = 720

	public request(requestDetails: HttpRequest): Promise<any> {

		requestDetails.method = 'GET'
		if (!requestDetails.headers) {
			requestDetails.headers = {
				Accept: 'application/json',
				Authorization: 'Bearer 326e635c-dd39-4e43-bfff-8d046e1cbafe',
			}
		}
		if (requestDetails.query) {
			requestDetails.url += `?${this.encodeParameters(requestDetails.query)}`
		}
		if (!requestDetails.expiration) {
			requestDetails.expiration = this.TWELWE_HOURS_IN_MINUTE
		}

		return Cache.get(requestDetails.url).then((cachedResponseEntity) => {
			return Promise.resolve(cachedResponseEntity)
		}).catch(() => {
			const request = new Request(`${requestDetails.url}`, requestDetails)
			return fetch(request).then((response) => {
				if (response.status < 400) {
					return response.json().then((responseEntity) => {
						Cache.set(requestDetails.url, responseEntity, requestDetails.expiration)
						return Promise.resolve(responseEntity)
					})
				}
			}).catch((error) => {
				return Promise.reject(error)
			})
		})
	}

	private encodeParameters(params: { [key: string]: string }): string {
		const formBody: string[] = []
		for (const property in params) {
			const encodedKey = encodeURIComponent(property)
			const encodedValue = encodeURIComponent(params[property])
			formBody.push(`${encodedKey}=${encodedValue}`)
		}
		return formBody.length > 0 ? `${formBody.join('&')}` : ``
	}

}

export default new Http()
