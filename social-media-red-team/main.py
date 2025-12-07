#!/usr/bin/env python3
"""
Social Media Red Team - Main OSINT Intelligence Gathering Tool
"""

import argparse
import logging
import sys
from pathlib import Path
from datetime import datetime
from typing import Dict, List, Optional
import yaml
from dotenv import load_dotenv

# Add src to path
sys.path.insert(0, str(Path(__file__).parent / "src"))

from platforms.bilibili import BilibiliOSINT
from platforms.twitter import TwitterOSINT
from platforms.reddit import RedditOSINT
from intelligence.analyzer import IntelligenceAnalyzer
from intelligence.strategy import StrategyGenerator
from reporting.reporter import ReportGenerator

# Load environment variables
load_dotenv()

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


class SocialMediaRedTeam:
    """Main orchestrator for OSINT intelligence gathering"""
    
    def __init__(self, config_path: Optional[str] = None):
        self.config = self._load_config(config_path)
        self.platforms = {}
        self.analyzer = IntelligenceAnalyzer()
        self.strategy_gen = StrategyGenerator()
        self.reporter = ReportGenerator(
            output_dir=self.config.get('output', {}).get('directory', './reports')
        )
        
        # Initialize platform handlers
        self._init_platforms()
    
    def _load_config(self, config_path: Optional[str]) -> Dict:
        """Load configuration from YAML file"""
        if config_path is None:
            config_path = Path(__file__).parent / "config" / "config.yaml"
        else:
            config_path = Path(config_path)
        
        if not config_path.exists():
            logger.warning(f"Config file not found: {config_path}, using defaults")
            return {}
        
        try:
            with open(config_path, 'r', encoding='utf-8') as f:
                return yaml.safe_load(f) or {}
        except Exception as e:
            logger.error(f"Error loading config: {e}")
            return {}
    
    def _init_platforms(self):
        """Initialize platform OSINT handlers"""
        rate_limits = self.config.get('rate_limiting', {})
        
        # Bilibili
        if self.config.get('platforms', {}).get('bilibili', {}).get('enabled', True):
            self.platforms['bilibili'] = BilibiliOSINT(
                rate_limit=rate_limits.get('bilibili', 1.0)
            )
        
        # Twitter
        if self.config.get('platforms', {}).get('twitter', {}).get('enabled', True):
            self.platforms['twitter'] = TwitterOSINT(
                rate_limit=rate_limits.get('twitter', 2.0)
            )
        
        # Reddit
        if self.config.get('platforms', {}).get('reddit', {}).get('enabled', True):
            self.platforms['reddit'] = RedditOSINT(
                rate_limit=rate_limits.get('reddit', 2.0)
            )
    
    def gather_intelligence(self, platform: str, identifier: str, deep_scan: bool = False) -> Dict:
        """Gather intelligence on a specific account"""
        logger.info(f"Starting intelligence gathering: {platform} - {identifier}")
        
        if platform not in self.platforms:
            raise ValueError(f"Platform '{platform}' not supported or not enabled")
        
        platform_handler = self.platforms[platform]
        
        # Perform analysis
        profile_data = platform_handler.analyze_profile(identifier)
        
        if not profile_data:
            logger.error(f"Failed to gather intelligence for {platform}:{identifier}")
            return {}
        
        # Add to analyzer
        self.analyzer.add_profile(profile_data)
        
        logger.info(f"Intelligence gathering completed for {platform}:{identifier}")
        return profile_data
    
    def generate_report(self, export_formats: List[str] = None) -> Dict:
        """Generate comprehensive intelligence report"""
        logger.info("Generating intelligence report")
        
        if export_formats is None:
            export_formats = self.config.get('output', {}).get('format', ['json', 'txt'])
        
        # Get all profiles
        profiles = self.analyzer.profiles
        
        # Generate threat assessment
        threat_assessment = self.analyzer.generate_threat_assessment()
        
        # Generate correlation
        correlation = self.analyzer.correlate_profiles()
        
        # Generate strategy
        strategy = self.strategy_gen.generate_strategy(threat_assessment, profiles)
        
        # Compile report data
        report_data = {
            'timestamp': datetime.now().isoformat(),
            'profiles': profiles,
            'threat_assessment': threat_assessment,
            'correlation': correlation,
            'strategy': strategy
        }
        
        # Generate reports in requested formats
        report_files = {}
        
        if 'json' in export_formats:
            report_files['json'] = self.reporter.generate_json_report(report_data)
        
        if 'html' in export_formats:
            report_files['html'] = self.reporter.generate_html_report(report_data)
        
        if 'txt' in export_formats:
            report_files['txt'] = self.reporter.generate_text_report(report_data)
        
        logger.info(f"Reports generated: {list(report_files.keys())}")
        
        return {
            'data': report_data,
            'files': report_files
        }
    
    def run_analysis(self, platform: str, identifier: str, deep_scan: bool = False, 
                    export_formats: List[str] = None) -> Dict:
        """Run complete analysis pipeline"""
        logger.info("=" * 80)
        logger.info("SOCIAL MEDIA RED TEAM - OSINT INTELLIGENCE GATHERING")
        logger.info("=" * 80)
        logger.info("⚠️  LEGAL DISCLAIMER: This tool is for authorized security research")
        logger.info("    and defensive purposes only. Use responsibly.")
        logger.info("=" * 80)
        logger.info("")
        
        # Gather intelligence
        profile_data = self.gather_intelligence(platform, identifier, deep_scan)
        
        if not profile_data:
            logger.error("Failed to gather intelligence. Exiting.")
            return {}
        
        # Generate report
        report = self.generate_report(export_formats)
        
        # Print summary
        self._print_summary(report['data'])
        
        return report
    
    def _print_summary(self, report_data: Dict):
        """Print summary to console"""
        print("\n" + "=" * 80)
        print("INTELLIGENCE SUMMARY")
        print("=" * 80)
        
        threat_assessment = report_data.get('threat_assessment', {})
        print(f"\nThreat Level: {threat_assessment.get('threat_level', 'N/A')}")
        print(f"Risk Score: {threat_assessment.get('overall_risk_score', 0)}/100")
        
        profiles = report_data.get('profiles', [])
        print(f"\nProfiles Analyzed: {len(profiles)}")
        for profile in profiles:
            platform = profile.get('platform', 'Unknown')
            account_id = profile.get('account_id') or profile.get('username', 'N/A')
            print(f"  - {platform.upper()}: {account_id}")
        
        strategy = report_data.get('strategy', {})
        immediate_actions = strategy.get('immediate_actions', [])
        if immediate_actions:
            print("\nImmediate Actions Recommended:")
            for action in immediate_actions[:3]:  # Show first 3
                print(f"  • {action}")
        
        print("\n" + "=" * 80)
        print("Full reports saved to:", self.reporter.output_dir)
        print("=" * 80 + "\n")


def main():
    """Main entry point"""
    parser = argparse.ArgumentParser(
        description='Social Media Red Team - OSINT Intelligence Gathering Tool',
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  python main.py --platform bilibili --account-id ACCOUNT_ID
  python main.py --platform bilibili --account-id ACCOUNT_ID --deep-scan --export-json --export-html
  python main.py --platform reddit --account-id username
        """
    )
    
    parser.add_argument(
        '--platform',
        required=True,
        choices=['bilibili', 'twitter', 'reddit'],
        help='Social media platform to analyze'
    )
    
    parser.add_argument(
        '--account-id',
        required=True,
        help='Account ID or username to analyze'
    )
    
    parser.add_argument(
        '--deep-scan',
        action='store_true',
        help='Perform deep scan (more thorough analysis)'
    )
    
    parser.add_argument(
        '--export-json',
        action='store_true',
        help='Export report as JSON'
    )
    
    parser.add_argument(
        '--export-html',
        action='store_true',
        help='Export report as HTML'
    )
    
    parser.add_argument(
        '--export-txt',
        action='store_true',
        help='Export report as text'
    )
    
    parser.add_argument(
        '--config',
        help='Path to configuration file'
    )
    
    args = parser.parse_args()
    
    # Determine export formats
    export_formats = []
    if args.export_json:
        export_formats.append('json')
    if args.export_html:
        export_formats.append('html')
    if args.export_txt:
        export_formats.append('txt')
    
    # Default to json and txt if none specified
    if not export_formats:
        export_formats = ['json', 'txt']
    
    try:
        # Initialize tool
        tool = SocialMediaRedTeam(config_path=args.config)
        
        # Run analysis
        result = tool.run_analysis(
            platform=args.platform,
            identifier=args.account_id,
            deep_scan=args.deep_scan,
            export_formats=export_formats
        )
        
        if result:
            print("\n✅ Analysis completed successfully!")
            sys.exit(0)
        else:
            print("\n❌ Analysis failed!")
            sys.exit(1)
    
    except KeyboardInterrupt:
        print("\n\n⚠️  Interrupted by user")
        sys.exit(1)
    except Exception as e:
        logger.error(f"Error: {e}", exc_info=True)
        print(f"\n❌ Error: {e}")
        sys.exit(1)


if __name__ == '__main__':
    main()

