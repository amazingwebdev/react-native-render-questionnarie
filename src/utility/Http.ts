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
				Authorization: 'Bearer 1ce61ae5-0121-4263-bb24-2fd065f8223a',
			}
		}
		if (requestDetails.query) {
			requestDetails.url += `?${this.encodeParameters(requestDetails.query)}`
		}
		console.warn(requestDetails)
		const request = new Request(`${requestDetails.url}`, requestDetails)

		try {
			const response = await fetch(request)
			console.warn(response)
			if (response.status < 400) {
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
