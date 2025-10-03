from django.core.management.base import BaseCommand
from apps.vouchers.models import VoucherType


class Command(BaseCommand):
    help = 'Create sample voucher types for development'

    def handle(self, *args, **options):
        voucher_types = [
            {
                'name': 'Result Check Voucher',
                'type_code': 'result_check',
                'description': 'Check your academic results online with this voucher. Valid for multiple uses within the validity period.',
                'price': 10.00,
                'validity_days': 30,
                'usage_limit': 3
            },
            {
                'name': 'School Application Voucher',
                'type_code': 'school_application',
                'description': 'Apply to schools and universities. This voucher covers application fees and processing.',
                'price': 25.00,
                'validity_days': 60,
                'usage_limit': 1
            },
            {
                'name': 'Placement Application Voucher',
                'type_code': 'placement_application',
                'description': 'Apply for job placements and internships. Includes access to placement portal.',
                'price': 15.00,
                'validity_days': 45,
                'usage_limit': 2
            },
            {
                'name': 'Certificate Verification',
                'type_code': 'certificate_verification',
                'description': 'Verify the authenticity of academic certificates and documents.',
                'price': 8.00,
                'validity_days': 14,
                'usage_limit': 1
            },
            {
                'name': 'Transcript Request',
                'type_code': 'transcript_request',
                'description': 'Request official academic transcripts from your institution.',
                'price': 20.00,
                'validity_days': 30,
                'usage_limit': 1
            }
        ]

        created_count = 0
        for vt_data in voucher_types:
            voucher_type, created = VoucherType.objects.get_or_create(
                type_code=vt_data['type_code'],
                defaults=vt_data
            )
            
            if created:
                created_count += 1
                self.stdout.write(
                    self.style.SUCCESS(f'✅ Created voucher type: {voucher_type.name}')
                )
            else:
                self.stdout.write(
                    self.style.WARNING(f'⚠️  Voucher type already exists: {voucher_type.name}')
                )

        if created_count > 0:
            self.stdout.write(
                self.style.SUCCESS(f'\n🎉 Successfully created {created_count} voucher types!')
            )
        else:
            self.stdout.write(
                self.style.WARNING('\n📦 All voucher types already exist.')
            )
