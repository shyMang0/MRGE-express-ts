import * as jobListingsService from '@/api/services/jobListings.service'
import * as crypto from 'crypto'
import * as spamPostsService from '@/api/services/spamPosts.service'
import axios from 'axios'
import * as xml2js from 'xml2js'

export const curlToXml = async (): Promise<any> => {
	try {
		const xml = await axios.get('https://mrge-group-gmbh.jobs.personio.de/xml')
		const xmljson = await xml2js.parseStringPromise(xml.data)
		console.log('xmls', xmljson)
		return xmljson
	} catch (error: any) {
		throw error
		console.error(error)
		//throw error
	}
	return false
}
