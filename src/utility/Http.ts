import Cache from './Cache'
export interface HttpRequest extends RequestInit {
	url?: string
	query?: {}
}

export interface HttpResponse extends Response {
	traceId?: string
}

class Http {

	public async request(requestDetails: HttpRequest): Promise<HttpResponse> {
		requestDetails.method = 'GET'
		if (!requestDetails.headers) {
			requestDetails.headers = {
				Accept: 'application/json',
				Authorization: 'Bearer 0e80b5e4-0505-4eda-b80f-77cb45d69209',
			}
		}
		if (requestDetails.query) {
			requestDetails.url += `?${this.encodeParameters(requestDetails.query)}`
		}
		console.warn(requestDetails)
		if (Cache.get(requestDetails)) {
			const response = Cache.get(requestDetails)
			return response
		}
		const request = new Request(`${requestDetails.url}`, requestDetails)

		try {
			const response = await fetch(request)
			console.warn(response)
			if (response.status < 400) {
				Cache.set(requestDetails, response, 10)
				return Promise.resolve(response)
			}
			return Promise.reject(response)
		} catch (error) {
			return Promise.reject(error)
		}
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
