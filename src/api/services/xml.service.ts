import axios from 'axios'
import * as xml2js from 'xml2js'

export const curlToXml = async (): Promise<any> => {
	try {
		const xml = await axios.get('https://mrge-group-gmbh.jobs.personio.de/xml')
		const xmljson = await xml2js.parseStringPromise(xml.data, { explicitArray: false })
		// console.log('xmls', xmljson)
		return xmljson
	} catch (error: any) {
		console.error(error)
		throw error
	}
	return false
}
