import "./style.scss";
import githubLogo from "../../assets/github-logo.svg";

export default function Footer()
{
	return (
		<div className="msp-footer">
			<span>Visit the project's repo here: </span>
			<a className="msp-anchor" href="https://github.com/WiktorM413/meeting-scheduling-platform" target="_blank" rel="noopener noreferrer" aria-label="Visit my GitHub profile">
				<img src={githubLogo} alt="GitHub" width="32" height="32"/>
			</a>
		</div>
	)
}