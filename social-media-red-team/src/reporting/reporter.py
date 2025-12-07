"""
Report Generation Module
"""

import json
import os
from typing import Dict, List, Optional
from datetime import datetime
from pathlib import Path
import logging

logger = logging.getLogger(__name__)


class ReportGenerator:
    """Generate intelligence reports in various formats"""
    
    def __init__(self, output_dir: str = "./reports"):
        self.output_dir = Path(output_dir)
        self.output_dir.mkdir(parents=True, exist_ok=True)
    
    def generate_json_report(self, data: Dict, filename: Optional[str] = None) -> str:
        """Generate JSON report"""
        if not filename:
            timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
            filename = f"intelligence_report_{timestamp}.json"
        
        filepath = self.output_dir / filename
        
        with open(filepath, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
        
        logger.info(f"JSON report saved to: {filepath}")
        return str(filepath)
    
    def generate_html_report(self, data: Dict, filename: Optional[str] = None) -> str:
        """Generate HTML report"""
        if not filename:
            timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
            filename = f"intelligence_report_{timestamp}.html"
        
        filepath = self.output_dir / filename
        
        html_content = self._generate_html_content(data)
        
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(html_content)
        
        logger.info(f"HTML report saved to: {filepath}")
        return str(filepath)
    
    def generate_text_report(self, data: Dict, filename: Optional[str] = None) -> str:
        """Generate text report"""
        if not filename:
            timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
            filename = f"intelligence_report_{timestamp}.txt"
        
        filepath = self.output_dir / filename
        
        text_content = self._generate_text_content(data)
        
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(text_content)
        
        logger.info(f"Text report saved to: {filepath}")
        return str(filepath)
    
    def _generate_html_content(self, data: Dict) -> str:
        """Generate HTML content"""
        html = f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OSINT Intelligence Report</title>
    <style>
        body {{
            font-family: Arial, sans-serif;
            margin: 20px;
            background-color: #f5f5f5;
        }}
        .container {{
            max-width: 1200px;
            margin: 0 auto;
            background: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }}
        h1 {{
            color: #333;
            border-bottom: 3px solid #4CAF50;
            padding-bottom: 10px;
        }}
        h2 {{
            color: #555;
            margin-top: 30px;
        }}
        .section {{
            margin: 20px 0;
            padding: 15px;
            background: #f9f9f9;
            border-left: 4px solid #4CAF50;
        }}
        .risk-high {{ color: #f44336; font-weight: bold; }}
        .risk-medium {{ color: #ff9800; font-weight: bold; }}
        .risk-low {{ color: #4CAF50; font-weight: bold; }}
        pre {{
            background: #f4f4f4;
            padding: 10px;
            border-radius: 4px;
            overflow-x: auto;
        }}
        .warning {{
            background: #fff3cd;
            border: 1px solid #ffc107;
            padding: 15px;
            border-radius: 4px;
            margin: 20px 0;
        }}
    </style>
</head>
<body>
    <div class="container">
        <h1>OSINT Intelligence Report</h1>
        <div class="warning">
            <strong>⚠️ Legal Disclaimer:</strong> This report is for authorized security research and defensive purposes only.
            Use responsibly and in compliance with all applicable laws.
        </div>
        <div class="section">
            <h2>Report Information</h2>
            <p><strong>Generated:</strong> {data.get('timestamp', 'N/A')}</p>
            <p><strong>Threat Level:</strong> <span class="risk-{data.get('threat_assessment', {}).get('threat_level', 'low').lower()}">{data.get('threat_assessment', {}).get('threat_level', 'N/A')}</span></p>
        </div>
"""
        
        # Add profiles
        profiles = data.get('profiles', [])
        if profiles:
            html += "<div class='section'><h2>Profile Analysis</h2>"
            for profile in profiles:
                platform = profile.get('platform', 'Unknown')
                account_id = profile.get('account_id') or profile.get('username', 'N/A')
                html += f"<h3>{platform.upper()} - {account_id}</h3>"
                html += f"<pre>{json.dumps(profile, indent=2, ensure_ascii=False)}</pre>"
            html += "</div>"
        
        # Add threat assessment
        threat_assessment = data.get('threat_assessment', {})
        if threat_assessment:
            html += "<div class='section'><h2>Threat Assessment</h2>"
            html += f"<p><strong>Risk Score:</strong> {threat_assessment.get('overall_risk_score', 0)}/100</p>"
            html += f"<p><strong>Threat Level:</strong> {threat_assessment.get('threat_level', 'N/A')}</p>"
            
            indicators = threat_assessment.get('indicators', [])
            if indicators:
                html += "<h3>Threat Indicators</h3><ul>"
                for indicator in indicators:
                    html += f"<li>{indicator}</li>"
                html += "</ul>"
            
            recommendations = threat_assessment.get('recommendations', [])
            if recommendations:
                html += "<h3>Recommendations</h3><ul>"
                for rec in recommendations:
                    html += f"<li>{rec}</li>"
                html += "</ul>"
            
            html += "</div>"
        
        # Add strategy
        strategy = data.get('strategy', {})
        if strategy:
            html += "<div class='section'><h2>Defensive Strategy</h2>"
            
            immediate = strategy.get('immediate_actions', [])
            if immediate:
                html += "<h3>Immediate Actions</h3><ul>"
                for action in immediate:
                    html += f"<li>{action}</li>"
                html += "</ul>"
            
            short_term = strategy.get('short_term_actions', [])
            if short_term:
                html += "<h3>Short-term Actions</h3><ul>"
                for action in short_term:
                    html += f"<li>{action}</li>"
                html += "</ul>"
            
            html += "</div>"
        
        html += """
    </div>
</body>
</html>
"""
        return html
    
    def _generate_text_content(self, data: Dict) -> str:
        """Generate text content"""
        lines = []
        lines.append("=" * 80)
        lines.append("OSINT INTELLIGENCE REPORT")
        lines.append("=" * 80)
        lines.append("")
        lines.append("⚠️  LEGAL DISCLAIMER: This report is for authorized security research")
        lines.append("    and defensive purposes only. Use responsibly and in compliance")
        lines.append("    with all applicable laws.")
        lines.append("")
        lines.append(f"Generated: {data.get('timestamp', 'N/A')}")
        lines.append("")
        
        # Threat assessment
        threat_assessment = data.get('threat_assessment', {})
        if threat_assessment:
            lines.append("THREAT ASSESSMENT")
            lines.append("-" * 80)
            lines.append(f"Threat Level: {threat_assessment.get('threat_level', 'N/A')}")
            lines.append(f"Risk Score: {threat_assessment.get('overall_risk_score', 0)}/100")
            lines.append("")
            
            indicators = threat_assessment.get('indicators', [])
            if indicators:
                lines.append("Threat Indicators:")
                for indicator in indicators:
                    lines.append(f"  - {indicator}")
                lines.append("")
            
            recommendations = threat_assessment.get('recommendations', [])
            if recommendations:
                lines.append("Recommendations:")
                for rec in recommendations:
                    lines.append(f"  - {rec}")
                lines.append("")
        
        # Strategy
        strategy = data.get('strategy', {})
        if strategy:
            lines.append("DEFENSIVE STRATEGY")
            lines.append("-" * 80)
            
            immediate = strategy.get('immediate_actions', [])
            if immediate:
                lines.append("Immediate Actions:")
                for action in immediate:
                    lines.append(f"  - {action}")
                lines.append("")
            
            short_term = strategy.get('short_term_actions', [])
            if short_term:
                lines.append("Short-term Actions:")
                for action in short_term:
                    lines.append(f"  - {action}")
                lines.append("")
        
        # Profiles
        profiles = data.get('profiles', [])
        if profiles:
            lines.append("PROFILE ANALYSIS")
            lines.append("-" * 80)
            for profile in profiles:
                platform = profile.get('platform', 'Unknown')
                account_id = profile.get('account_id') or profile.get('username', 'N/A')
                lines.append(f"\n{platform.upper()}: {account_id}")
                lines.append(json.dumps(profile, indent=2, ensure_ascii=False))
                lines.append("")
        
        lines.append("=" * 80)
        
        return "\n".join(lines)

