import React from 'react';

import { Row, Col ,  Tabs, Icon ,Carousel} from 'antd';
import 'antd/dist/antd.css';
const TabPane = Tabs.TabPane;

export default class Ready extends React.Component{
	render() {
		return (
			<div>
				<Row>
					<Col span={2}>
					</Col>
					<Col span={20}>
						<div className="ready">准备丰盛的三餐，为家人，也为自己</div>
					</Col>
					<Col span={2}>
					</Col>
				</Row>
				<Row>
					<Col span={2}>
					</Col>
					<Col span={20}>
						<Row>
							<Col span={8}>
								<Row>
									<Col span={1}>
									</Col>
									<Col span={22}>
										<img className="RDimg" src="http://i3.meishichina.com/attachment/recipe/2016/05/03/20160503dpub2rfq0p1obbx5.JPG@!p800" />
									</Col>
									<Col span={1}>
									</Col>
								</Row>									
								<p className="RDp">卡通猫咪面包片</p>
							</Col>
							<Col span={8}>
								<Row>
									<Col span={1}>
									</Col>
									<Col span={22}>
										<img className="RDimg" src="http://i3.meishichina.com/attachment/recipe/2015/06/26/20150625a3e70cede05bb886.jpg@!p800" />
									</Col>
									<Col span={1}>
									</Col>
								</Row>									
								<p className="RDp">田园腊肠焖饭</p>
							</Col>
							<Col span={8}>
								<Row>
									<Col span={1}>
									</Col>
									<Col span={22}>
										<img className="RDimg" src="http://i3.meishichina.com/attachment/recipe/2012/10/21/20121021104744570590762.jpg@!p800" />
									</Col>
									<Col span={1}>
									</Col>
								</Row>									
								<p className="RDp">香肠蘑菇意面</p>
							</Col>												
						</Row>
					</Col>
					<Col span={2}>
					</Col>
				</Row>
			</div>
		);
	}
}