import { COLORS } from 'constants/ChartConstant';

export const weeklyRevenueData = {
	series: [
	  {
		name: 'Soda',
		data: [45, 52, 38, 24, 33, 26, 21]
	  }
	],
	categories:[
	  '08 Jul', 
	  '09 Jul', 
	  '10 Jul', 
	  '11 Jul', 
	  '12 Jul', 
	  '13 Jul', 
	  '14 Jul'
	]
}

export const topProductData = [
	{
		name: 'Blue Jacket',
		image: '/img/thumbs/thumb-7.jpg',
		category: 'Cloths',
		sales: 5930,
		status: 'up'
	},
	{
		name: 'White Sneaker',
		image: '/img/thumbs/thumb-12.jpg',
		category: 'Cloths',
		sales: 5177,
		status: 'up'
	},
	{
		name: 'Red Beat Headphone',
		image: '/img/thumbs/thumb-14.jpg',
		category: 'Devices',
		sales: 4701,
		status: 'down'
	},
	{
		name: 'Apple Watch',
		image: '/img/thumbs/thumb-17.jpg',
		category: 'Devices',
		sales: 2833,
		status: 'up'
	},
	{
		name: 'Blue Backpack',
		image: '/img/thumbs/thumb-11.jpg',
		category: 'Bags',
		sales: 1692,
		status: 'down'
	},
]

export const customerChartData = [
	{
		name: 'Store Customers',
		data: [28, 25, 64, 40, 75, 45, 70]
	},
	{
		name: 'Online Customers',
		data: [25, 15, 41, 25, 44, 12, 36]
	}
]

export const sessionColor = [COLORS[0], COLORS[1], COLORS[3], COLORS[5]]
export const sessionData = [3561, 1443, 2462, 1693]
export const sessionLabels = ['Cloths', 'Devices', 'Bags', 'Watches']
const jointSessionData = () => {
	let arr = []
	for (let i = 0; i < sessionData.length; i++) {
		const data = sessionData[i];
		const label = sessionLabels[i];
		const color = sessionColor[i]
		arr = [...arr, {
			data: data,
			label: label,
			color: color
		}]
	}
	return arr
}
export const conbinedSessionData = jointSessionData()

export const recentOrderData = [
	
]