interface HttpRequest extends RequestInit {
	url?: string
	query?: {}
}

interface HttpResponse extends Response {
	traceId?: string
}

class Http {

	public async request(requestDetails: HttpRequest): Promise<HttpResponse> {
		requestDetails.method = 'GET'
		if (!requestDetails.headers) {
			requestDetails.headers = {
				Accept: 'application/json',
			}
		}
		if (requestDetails.query) {
			requestDetails.url += `?${this.encodeParameters(requestDetails.query)}`
		}

		const request = new Request(`${requestDetails.url}`, requestDetails)

		try {
			const response = await fetch(request)
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
