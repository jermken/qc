import React, { Component } from "react"
import './home.scss'
import logo from '../../img/qc_logo.png'

export default class Home extends Component {
	render() {
		return (
			<div className="home">
				<img className="home-logo" src={logo} />
				<div className="home-title">
					<a href="https://github.com/jermken/qc-cli" target="_blank">
						qc全家桶脚手架使用手册
					</a>
				</div>
				<div className="home-main">
					<div className="home-desc">
						<div className="home-desc__title">集成</div>
						<div className="home-desc__info">
							qc集成对多个框架及打包工具的支持，免去多个脚手架的安装，针对技术选型选择合适的框架及构建工具
						</div>
					</div>
					<div className="home-desc">
						<div className="home-desc__title">易用</div>
						<div className="home-desc__info">
							脚手架使用简单，一键生成项目。项目构建灵活，针对熟悉的框架而配置
						</div>
					</div>
					<div className="home-desc">
						<div className="home-desc__title">扩展</div>
						<div className="home-desc__info">
							较好的扩展性，满足特定的配置，集成到工程化中，保证构建的灵活性。
						</div>
					</div>
				</div>
			</div>
		);
	}
}
