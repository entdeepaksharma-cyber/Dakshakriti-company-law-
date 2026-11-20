import { 
  Company, 
  Person, 
  Role, 
  Authority, 
  Shareholding, 
  Document, 
  Evidence, 
  CorporateEvent, 
  LegalSource, 
  ComplianceItem, 
  DueDiligenceMatter, 
  RedFlag, 
  CorporateMeeting, 
  CorporateResolution, 
  CommercialContract, 
  LegalProceeding, 
  VerificationItem, 
  AuditLogEntry,
  User
} from '../types';

export const CURRENT_USER: User = {
  user_id: 'usr_deepak_01',
  name: 'Deepak Sharma, FCS',
  email: 'deepak.cs@dakshakriti.legal',
  role: 'PROFESSIONAL',
  organization: 'Dakshakriti Legal Advisors LLP'
};

export const INITIAL_COMPANIES: Company[] = [
  {
    company_id: 'comp_abc_001',
    legal_name: 'ABC Private Limited',
    former_names: ['ABC Innovations Private Limited (2024)'],
    identifier: 'U72900DL2024PTC392811',
    corporate_type: 'Private Limited Company',
    incorporation_date: '2024-01-10',
    jurisdiction: 'Registrar of Companies, Delhi & Haryana',
    registered_address: 'Plot 402, Barakhamba Road, Connaught Place, New Delhi - 110001',
    authorized_capital: 5000000,
    paid_up_capital: 2500000,
    status: 'Active',
    source_status: 'SOURCE_RECORD',
    created_at: '2024-01-10T09:00:00Z',
    updated_at: '2026-03-31T17:00:00Z'
  },
  {
    company_id: 'comp_xyz_002',
    legal_name: 'XYZ Infotech Limited',
    former_names: [],
    identifier: 'L72200MH2021PLC319200',
    corporate_type: 'Public Limited Company',
    incorporation_date: '2021-04-14',
    jurisdiction: 'Registrar of Companies, Mumbai',
    registered_address: 'B-Wing 1201, Express Towers, Nariman Point, Mumbai - 400021',
    authorized_capital: 20000000,
    paid_up_capital: 15000000,
    status: 'Active',
    source_status: 'HUMAN_VERIFIED',
    created_at: '2021-04-14T10:00:00Z',
    updated_at: '2026-02-15T11:00:00Z'
  },
  {
    company_id: 'comp_pqr_003',
    legal_name: 'PQR Heavy Engineering Private Limited',
    former_names: [],
    identifier: 'U28100KA2023PTC189211',
    corporate_type: 'Private Limited Company',
    incorporation_date: '2023-08-19',
    jurisdiction: 'Registrar of Companies, Bangalore',
    registered_address: 'Industrial Area Phase 2, Peenya, Bengaluru - 560058',
    authorized_capital: 10000000,
    paid_up_capital: 7500000,
    status: 'Active',
    source_status: 'HUMAN_VERIFIED',
    created_at: '2023-08-19T09:30:00Z',
    updated_at: '2026-01-10T14:20:00Z'
  }
];

export const INITIAL_PEOPLE: Person[] = [
  {
    person_id: 'per_rahul_01',
    full_name: 'Rahul Sharma',
    aliases: ['R. Sharma', 'Rahul S. Sharma', 'Mr. Rahul Sharma'],
    din: '08942115',
    pan: 'ABCPS1234D',
    status: 'Active',
    verification_status: 'HUMAN_VERIFIED'
  },
  {
    person_id: 'per_priya_02',
    full_name: 'Priya Mehta',
    aliases: ['P. Mehta', 'Mrs. Priya Mehta'],
    din: '07832901',
    pan: 'BMXPM8891K',
    status: 'Inactive',
    verification_status: 'HUMAN_VERIFIED'
  },
  {
    person_id: 'per_anita_03',
    full_name: 'Anita Mehta',
    aliases: ['A. Mehta', 'Anita R. Mehta'],
    din: '09124482',
    pan: 'AGMPM3421R',
    status: 'Active',
    verification_status: 'HUMAN_VERIFIED'
  },
  {
    person_id: 'per_vikram_04',
    full_name: 'Vikram Singh',
    aliases: ['V. Singh', 'Vikram K. Singh'],
    din: '06541299',
    pan: 'BCVPS5432E',
    status: 'Active',
    verification_status: 'HUMAN_VERIFIED'
  },
  {
    person_id: 'per_sunil_05',
    full_name: 'Sunil Kapoor',
    aliases: ['S. Kapoor'],
    din: '08311200',
    pan: 'DDFPK9912L',
    status: 'Active',
    verification_status: 'NEEDS_REVIEW'
  }
];

export const INITIAL_ROLES: Role[] = [
  {
    role_id: 'role_01',
    person_id: 'per_rahul_01',
    company_id: 'comp_abc_001',
    role_type: 'Director',
    title: 'Managing Director & CEO',
    start_date: '2024-01-10',
    verification_status: 'HUMAN_VERIFIED'
  },
  {
    role_id: 'role_02',
    person_id: 'per_rahul_01',
    company_id: 'comp_abc_001',
    role_type: 'Shareholder',
    title: 'Promoter Shareholder (60% then 45%)',
    start_date: '2024-01-10',
    verification_status: 'HUMAN_VERIFIED'
  },
  {
    role_id: 'role_03',
    person_id: 'per_priya_02',
    company_id: 'comp_abc_001',
    role_type: 'Director',
    title: 'Whole-Time Director',
    start_date: '2024-01-10',
    end_date: '2025-01-10', // conflict with 2025-01-15 in DIR-11
    verification_status: 'DISPUTED'
  },
  {
    role_id: 'role_04',
    person_id: 'per_priya_02',
    company_id: 'comp_abc_001',
    role_type: 'Shareholder',
    title: 'Promoter Shareholder (40% down to 20%)',
    start_date: '2024-01-10',
    verification_status: 'HUMAN_VERIFIED'
  },
  {
    role_id: 'role_05',
    person_id: 'per_anita_03',
    company_id: 'comp_abc_001',
    role_type: 'Additional Director',
    title: 'Additional Director (Operations)',
    start_date: '2024-03-12',
    verification_status: 'HUMAN_VERIFIED'
  },
  {
    role_id: 'role_06',
    person_id: 'per_vikram_04',
    company_id: 'comp_abc_001',
    role_type: 'Director',
    title: 'Independent Director',
    start_date: '2025-02-18',
    verification_status: 'HUMAN_VERIFIED'
  },
  {
    role_id: 'role_07',
    person_id: 'per_sunil_05',
    company_id: 'comp_abc_001',
    role_type: 'Shareholder',
    title: 'Series Seed Investor (25%)',
    start_date: '2024-09-15',
    verification_status: 'NEEDS_REVIEW'
  }
];

export const INITIAL_AUTHORITIES: Authority[] = [
  {
    authority_id: 'auth_01',
    person_id: 'per_rahul_01',
    role_id: 'role_01',
    company_id: 'comp_abc_001',
    scope: 'General Executive Power, Banking Operations, Commercial Contract Execution',
    limitations: 'Contracts exceeding ₹1 Crore require prior Board Approval',
    monetary_limit: 10000000,
    effective_start: '2024-01-10',
    supporting_resolution_id: 'res_01',
    legal_basis: 'Articles of Association Clause 42 & Board Resolution dated 10 Jan 2024',
    verification_status: 'HUMAN_VERIFIED'
  },
  {
    authority_id: 'auth_02',
    person_id: 'per_rahul_01',
    role_id: 'role_01',
    company_id: 'comp_abc_001',
    scope: 'Borrowing Powers & Creation of Security on Fixed Assets',
    limitations: 'Limited strictly up to ₹5 Crore from Scheduled Commercial Banks',
    monetary_limit: 50000000,
    effective_start: '2025-08-04',
    supporting_resolution_id: 'res_04',
    legal_basis: 'Companies Act, 2013 Section 179(3)(d) & Special Board Resolution dated 04 Aug 2025',
    verification_status: 'HUMAN_VERIFIED'
  },
  {
    authority_id: 'auth_03',
    person_id: 'per_priya_02',
    role_id: 'role_03',
    company_id: 'comp_abc_001',
    scope: 'Signing Authority for Operational Vendor Agreements under ₹25 Lakhs',
    limitations: 'Extinguished upon cessation of directorship',
    monetary_limit: 2500000,
    effective_start: '2024-01-10',
    effective_end: '2025-01-10',
    legal_basis: 'Board Delegation Resolution dated 10 Jan 2024',
    verification_status: 'DISPUTED'
  }
];

export const INITIAL_LEGAL_SOURCES: LegalSource[] = [
  {
    source_id: 'leg_sec_7',
    source_type: 'STATUTE',
    title: 'Companies Act, 2013 - Section 7',
    citation: 'Section 7, Act No. 18 of 2013',
    section: '7',
    authority: 'Ministry of Corporate Affairs (MCA), Govt of India',
    effective_from: '2014-04-01',
    requirement: 'Filing of incorporation documents with Registrar; issue of Certificate of Incorporation (CIN).',
    applicability: 'All proposed companies being formed under the Act.',
    expected_documents: ['Form SPICe+', 'MOA', 'AOA', 'Declaration INC-8', 'Certificate of Incorporation'],
    expected_filings: ['SPICe+ Part B', 'INC-9', 'AGILE-PRO-S']
  },
  {
    source_id: 'leg_sec_149',
    source_type: 'STATUTE',
    title: 'Companies Act, 2013 - Section 149 & 152',
    citation: 'Section 149 & 152, Act No. 18 of 2013',
    section: '149, 152',
    rule: 'Rule 8 & 14, Companies (Appointment and Qualification of Directors) Rules, 2014',
    authority: 'Ministry of Corporate Affairs',
    effective_from: '2014-04-01',
    requirement: 'Appointment of directors; minimum directors requirement; consent in Form DIR-2; disclosure in DIR-8.',
    applicability: 'Private company must maintain minimum 2 directors; public company minimum 3.',
    expected_documents: ['Board Resolution / GM Resolution', 'Consent Form DIR-2', 'Declaration DIR-8', 'Appointment Letter'],
    expected_filings: ['Form DIR-12 with ROC within 30 days']
  },
  {
    source_id: 'leg_sec_168',
    source_type: 'STATUTE',
    title: 'Companies Act, 2013 - Section 168',
    citation: 'Section 168, Act No. 18 of 2013',
    section: '168',
    rule: 'Rule 15 & 16, Companies (Appointment and Qualification of Directors) Rules, 2014',
    authority: 'Ministry of Corporate Affairs',
    effective_from: '2014-04-01',
    requirement: 'Resignation of a director takes effect from the date notice is received by company or date specified in notice, whichever is later.',
    applicability: 'Any director tendering resignation.',
    expected_documents: ['Formal Resignation Letter', 'Board Acknowledgement / Resolution', 'Proof of Delivery'],
    expected_filings: ['Company files Form DIR-12 within 30 days', 'Director may file Form DIR-11']
  },
  {
    source_id: 'leg_sec_62',
    source_type: 'STATUTE',
    title: 'Companies Act, 2013 - Section 62',
    citation: 'Section 62(1)(a), Act No. 18 of 2013',
    section: '62',
    rule: 'Rule 12, Companies (Share Capital and Debentures) Rules, 2014',
    authority: 'Ministry of Corporate Affairs',
    effective_from: '2014-04-01',
    requirement: 'Further issue of share capital (Rights Issue / Preferential Allotment) with pre-emptive offer period.',
    applicability: 'Whenever company proposes to increase subscribed capital.',
    expected_documents: ['Board Resolution', 'Offer Letter PAS-4', 'Valuation Report', 'Allotment Resolution'],
    expected_filings: ['Form PAS-3 (Return of Allotment) within 30 days of allotment']
  },
  {
    source_id: 'leg_sec_56',
    source_type: 'STATUTE',
    title: 'Companies Act, 2013 - Section 56',
    citation: 'Section 56, Act No. 18 of 2013',
    section: '56',
    rule: 'Rule 11, Companies (Share Capital and Debentures) Rules, 2014',
    authority: 'Ministry of Corporate Affairs',
    effective_from: '2014-04-01',
    requirement: 'Transfer of securities requires a duly stamped, dated and executed instrument of transfer (Form SH-4) delivered within 60 days.',
    applicability: 'All equity/preference share transfers in physical or demat mode.',
    expected_documents: ['Share Transfer Deed Form SH-4', 'Share Certificate', 'Proof of Stamp Duty payment', 'Board Approval Minutes'],
    expected_filings: ['Register of Members entry (MGT-1)', 'Annual Return MGT-7 reporting']
  },
  {
    source_id: 'leg_sec_179_180',
    source_type: 'STATUTE',
    title: 'Companies Act, 2013 - Section 179(3) & Section 180',
    citation: 'Section 179(3)(d), 180(1)(c), Act No. 18 of 2013',
    section: '179(3), 180',
    authority: 'Ministry of Corporate Affairs',
    effective_from: '2014-04-01',
    requirement: 'Board powers to borrow monies exercised only by means of resolutions passed at meetings of the Board. Special resolution required if borrowing exceeds capital + free reserves.',
    applicability: 'Corporate borrowings, loan facilities, and credit lines.',
    expected_documents: ['Board Meeting Notice', 'Board Resolution', 'Sanction Letter from Bank', 'Loan Agreement'],
    expected_filings: ['Form MGT-14 for Section 179(3) / 180 resolutions within 30 days']
  },
  {
    source_id: 'leg_sec_77',
    source_type: 'STATUTE',
    title: 'Companies Act, 2013 - Section 77 & 78',
    citation: 'Section 77(1), Act No. 18 of 2013',
    section: '77',
    rule: 'Rule 3, Companies (Registration of Charges) Rules, 2014',
    authority: 'Ministry of Corporate Affairs',
    effective_from: '2014-04-01',
    requirement: 'Duty to register charges created by company on its property, assets or undertaking within 30 days of creation.',
    applicability: 'Any hypothecation, mortgage or security interest given to lenders.',
    expected_documents: ['Sanction Letter', 'Deed of Hypothecation', 'Loan Agreement', 'Board Resolution'],
    expected_filings: ['Form CHG-1 with ROC within 30 days; Certificate of Registration of Charge Form CHG-2']
  },
  {
    source_id: 'leg_sec_206',
    source_type: 'STATUTE',
    title: 'Companies Act, 2013 - Section 206',
    citation: 'Section 206(1), Act No. 18 of 2013',
    section: '206',
    authority: 'Registrar of Companies / Regional Director',
    effective_from: '2014-04-01',
    requirement: 'Power of Registrar to call for information, explanation or documents on scrutiny of filed returns.',
    applicability: 'Inquiries by ROC based on irregularities or public complaints.',
    expected_documents: ['ROC Show Cause Notice', 'Company Reply with supporting annexures', 'Board authorization for reply'],
    expected_filings: ['Response letter with ROC within specified timeline (usually 15-30 days)']
  },
  {
    source_id: 'leg_sec_241',
    source_type: 'STATUTE',
    title: 'Companies Act, 2013 - Section 241 & 242',
    citation: 'Section 241, 242, Act No. 18 of 2013',
    section: '241, 242',
    authority: 'National Company Law Tribunal (NCLT)',
    effective_from: '2016-06-01',
    requirement: 'Application to Tribunal for relief in cases of oppression and mismanagement by eligible members holding not less than 10% shares.',
    applicability: 'Corporate governance disputes, dilution challenges, minority shareholder claims.',
    expected_documents: ['Company Petition under NCLT Rules Form NCLT-1', 'Affidavits', 'Interim Application', 'Tribunal Orders'],
    expected_filings: ['Form INC-28 with ROC within 30 days of receiving Tribunal order']
  }
];

export const INITIAL_DOCUMENTS: Document[] = [
  {
    document_id: 'doc_001_inc',
    company_id: 'comp_abc_001',
    document_type: 'Certificate of Incorporation',
    title: 'Certificate of Incorporation - ABC Private Limited',
    document_date: '2024-01-10',
    effective_date: '2024-01-10',
    source: 'Registrar of Companies, Delhi Gazette Registry',
    storage_reference: 's3://dakshakriti-vault/abc/D001_COI_2024.pdf',
    file_hash: 'sha256:7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069',
    version: 1,
    content_text: `GOVERNMENT OF INDIA, MINISTRY OF CORPORATE AFFAIRS
Central Registration Centre - Certificate of Incorporation
Corporate Identity Number (CIN): U72900DL2024PTC392811
I hereby certify that ABC PRIVATE LIMITED is incorporated on this Tenth day of January Two Thousand Twenty-Four under the Companies Act, 2013 (18 of 2013).
Given under my hand at Manesar this 10th Day of January 2024.
First Directors named in Articles: Rahul Sharma, Priya Mehta.
Authorized Share Capital: INR 50,00,000 divided into 5,00,000 Equity Shares of INR 10 each.`,
    parties: ['Govt of India', 'Rahul Sharma', 'Priya Mehta'],
    processing_status: 'REVIEWED',
    classification_confidence: 0.99,
    verification_status: 'SOURCE_RECORD'
  },
  {
    document_id: 'doc_002_moa',
    company_id: 'comp_abc_001',
    document_type: 'Memorandum of Association',
    title: 'Memorandum of Association (MOA) - Clause IV & V',
    document_date: '2024-01-08',
    effective_date: '2024-01-10',
    source: 'Incorporation File SPICe+ MoA Form INC-33',
    storage_reference: 's3://dakshakriti-vault/abc/D002_MOA_Executed.pdf',
    file_hash: 'sha256:1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b',
    version: 1,
    content_text: `MEMORANDUM OF ASSOCIATION OF ABC PRIVATE LIMITED
Clause III: Main Objects to be pursued: To carry on the business of legal technology, enterprise software, data architecture and AI systems.
Clause IV: The liability of the member(s) is limited.
Clause V: The Authorized Share Capital of the Company is Rs. 50,00,000/- (Rupees Fifty Lakhs only) divided into 5,00,000 (Five Lakh) Equity Shares of Rs. 10/- each.
Subscribers: Rahul Sharma (60,000 shares), Priya Mehta (40,000 shares). Total Initial Paid-up Capital: Rs. 10,00,000/-.`,
    parties: ['Rahul Sharma', 'Priya Mehta'],
    processing_status: 'REVIEWED',
    classification_confidence: 0.98,
    verification_status: 'HUMAN_VERIFIED'
  },
  {
    document_id: 'doc_003_aoa',
    company_id: 'comp_abc_001',
    document_type: 'Articles of Association',
    title: 'Articles of Association (AOA) - Internal Regulations',
    document_date: '2024-01-08',
    effective_date: '2024-01-10',
    source: 'Incorporation File SPICe+ AoA Form INC-34',
    storage_reference: 's3://dakshakriti-vault/abc/D003_AOA_Executed.pdf',
    file_hash: 'sha256:99887766554433221100aabbccddeeff00112233445566778899aabbccddeeff',
    version: 1,
    content_text: `ARTICLES OF ASSOCIATION OF ABC PRIVATE LIMITED
Clause 14: Transfer of shares requires prior approval of the Board of Directors.
Clause 28: Quorum for Board Meeting shall be one-third of total strength or two directors, whichever is higher.
Clause 36: Board of Directors may from time to time borrow moneys for the purpose of the Company up to a maximum limit sanctioned by resolution.
Clause 41: First Directors shall be Rahul Sharma and Priya Mehta. The Board may appoint Additional Directors under Section 161.`,
    parties: ['Rahul Sharma', 'Priya Mehta'],
    processing_status: 'REVIEWED',
    classification_confidence: 0.97,
    verification_status: 'HUMAN_VERIFIED'
  },
  {
    document_id: 'doc_004_res_board',
    company_id: 'comp_abc_001',
    document_type: 'Board Resolution',
    title: 'Extract of Board Resolution - Banking & Operational Powers',
    document_date: '2024-01-20',
    effective_date: '2024-01-20',
    source: 'Minutes Book of the Board of Directors, Meeting No. 1',
    storage_reference: 's3://dakshakriti-vault/abc/D004_Board_Res_Meeting1.pdf',
    file_hash: 'sha256:c1c2c3c4c5c6c7c8c9d0d1d2d3d4d5d6d7d8d9e0e1e2e3e4e5e6e7e8e9f0f1f2',
    version: 1,
    content_text: `CERTIFIED TRUE COPY OF RESOLUTION PASSED AT 1ST MEETING OF BOARD OF DIRECTORS HELD ON 20TH JANUARY 2024 AT REGISTERED OFFICE.
"RESOLVED THAT Current Account be opened with HDFC Bank Ltd, Barakhamba Road Branch, in name of Company, and Mr. Rahul Sharma, Director, be and is hereby authorized to operate the account singly for amounts up to INR 25,00,000 and jointly with Mrs. Priya Mehta for amounts exceeding INR 25,00,000."
Signed: Rahul Sharma (Director), Priya Mehta (Director).`,
    parties: ['Rahul Sharma', 'Priya Mehta', 'HDFC Bank Ltd'],
    processing_status: 'REVIEWED',
    classification_confidence: 0.96,
    verification_status: 'HUMAN_VERIFIED'
  },
  {
    document_id: 'doc_005_dir_app',
    company_id: 'comp_abc_001',
    document_type: 'Director Appointment',
    title: 'Appointment Letter & Board Resolution for Anita Mehta',
    document_date: '2024-03-12',
    effective_date: '2024-03-12',
    source: 'Secretarial File & MCA Form DIR-12 SRN: R99281204',
    storage_reference: 's3://dakshakriti-vault/abc/D005_Appointment_AnitaMehta.pdf',
    file_hash: 'sha256:3344556677889900112233445566778899aabbccddeeff001122334455667788',
    version: 1,
    content_text: `APPOINTMENT OF ADDITIONAL DIRECTOR UNDER SECTION 161(1) OF COMPANIES ACT, 2013.
Date: 12 March 2024.
"RESOLVED THAT pursuant to Section 161(1) and Article 41 of AoA, Ms. Anita Mehta (DIN: 09124482) be and is hereby appointed as an Additional Director of ABC Private Limited with effect from 12th March 2024 to hold office up to the next Annual General Meeting."
Consent in Form DIR-2 and declaration in Form DIR-8 taken on record. DIR-12 filed on 25 March 2024.`,
    parties: ['Anita Mehta', 'Rahul Sharma', 'Priya Mehta'],
    processing_status: 'REVIEWED',
    classification_confidence: 0.97,
    verification_status: 'HUMAN_VERIFIED'
  },
  {
    document_id: 'doc_006_share_issue',
    company_id: 'comp_abc_001',
    document_type: 'Share Issue',
    title: 'Return of Allotment Form PAS-3 & Allotment Resolution',
    document_date: '2024-06-20',
    effective_date: '2024-06-20',
    source: 'MCA Portal Filing PAS-3 SRN: T10298411',
    storage_reference: 's3://dakshakriti-vault/abc/D006_Allotment_PAS3.pdf',
    file_hash: 'sha256:55667788990011223344556677889900aabbccddeeff00112233445566778899',
    version: 1,
    content_text: `ALLOTMENT OF 1,50,000 EQUITY SHARES OF RS. 10 EACH ON RIGHTS BASIS.
Meeting of Board of Directors held on 20 June 2024.
"RESOLVED THAT 1,50,000 Equity Shares of face value Rs. 10/- each fully paid up at par be allotted as follows:
1. Rahul Sharma: 90,000 shares
2. Priya Mehta: 60,000 shares
Paid-up share capital increased from Rs. 10,00,000/- (1,00,000 shares) to Rs. 25,00,000/- (2,50,000 shares)."
Form PAS-3 successfully approved by ROC on 04 July 2024.`,
    parties: ['Rahul Sharma', 'Priya Mehta'],
    processing_status: 'REVIEWED',
    classification_confidence: 0.95,
    verification_status: 'HUMAN_VERIFIED'
  },
  {
    document_id: 'doc_007_share_transfer',
    company_id: 'comp_abc_001',
    document_type: 'Share Transfer Document',
    title: 'Share Transfer Deed Form SH-4 & Board Minutes',
    document_date: '2024-09-15',
    effective_date: '2024-09-15',
    source: 'Register of Transfers & Minutes of Board Meeting No. 5',
    storage_reference: 's3://dakshakriti-vault/abc/D007_Transfer_SH4_SunilKapoor.pdf',
    file_hash: 'sha256:77889900112233445566778899aabbccddeeff0011223344556677889900aabb',
    version: 1,
    content_text: `FORM NO. SH-4 - SECURITIES TRANSFER FORM (Sec 56(1))
Transferor: Priya Mehta (Folio No. 2)
Transferee: Sunil Kapoor (Folio No. 3)
Number of Equity Shares: 62,500 Shares of face value Rs. 10 each (representing 25% of total paid-up capital of 2,50,000 shares).
Consideration: INR 62,50,000 (INR 100 per share).
Approved at Board Meeting held on 15 September 2024.
Resulting Shareholding: Rahul Sharma (1,50,000 shares - 60%), Priya Mehta (37,500 shares - 15%), Sunil Kapoor (62,500 shares - 25%).`,
    parties: ['Priya Mehta', 'Sunil Kapoor', 'Rahul Sharma'],
    processing_status: 'REVIEWED',
    classification_confidence: 0.96,
    verification_status: 'HUMAN_VERIFIED'
  },
  {
    document_id: 'doc_008_resignation_priya',
    company_id: 'comp_abc_001',
    document_type: 'Director Resignation',
    title: 'Resignation Letter of Priya Mehta [CONFLICT FLAGGED]',
    document_date: '2025-01-10',
    effective_date: '2025-01-10',
    source: 'Company Correspondence & DIR-11 filed with MCA',
    storage_reference: 's3://dakshakriti-vault/abc/D008_Resignation_PriyaMehta.pdf',
    file_hash: 'sha256:bbccddeeff00112233445566778899aabbccddeeff0011223344556677889900',
    version: 1,
    content_text: `NOTICE OF RESIGNATION AS DIRECTOR (SECTION 168)
To: The Board of Directors, ABC Private Limited.
I, Priya Mehta, hereby tender my resignation as Director of ABC Private Limited with effect from 10th January 2025 due to personal pre-occupations.
Signed: Priya Mehta, Date: 10 January 2025.
[DISCREPANCY ALERT: MCA Filing Form DIR-11 submitted by Priya Mehta cites effective cessation date as 15th January 2025; Board resolution passed on 18th January 2025].`,
    parties: ['Priya Mehta', 'Rahul Sharma'],
    processing_status: 'REVIEWED',
    classification_confidence: 0.94,
    verification_status: 'DISPUTED'
  },
  {
    document_id: 'doc_009_borrowing_res',
    company_id: 'comp_abc_001',
    document_type: 'Borrowing Resolution',
    title: 'Board Resolution for HDFC Bank Credit Facility of Rs 5 Crore',
    document_date: '2025-08-04',
    effective_date: '2025-08-04',
    source: 'Board Meeting Minutes & Form MGT-14 SRN: F88102911',
    storage_reference: 's3://dakshakriti-vault/abc/D009_Board_Borrowing_Rs5Cr.pdf',
    file_hash: 'sha256:ddeeff00112233445566778899aabbccddeeff00112233445566778899001122',
    version: 1,
    content_text: `EXTRACT OF RESOLUTION PASSED AT BOARD MEETING HELD ON 4TH AUGUST 2025.
"RESOLVED THAT pursuant to Section 179(3)(d) of Companies Act 2013 and Article 36 of AoA, consent of Board be accorded to borrow term loan facility of INR 5,00,00,000 (Rupees Five Crore only) from HDFC Bank Ltd.
RESOLVED FURTHER that Rahul Sharma, Managing Director, be authorized to execute Loan Agreement, Hypothecation Deed, Promissory Notes and create charge on company assets."
Form MGT-14 filed on 18 August 2025.`,
    parties: ['Rahul Sharma', 'Anita Mehta', 'HDFC Bank Ltd'],
    processing_status: 'REVIEWED',
    classification_confidence: 0.98,
    verification_status: 'HUMAN_VERIFIED'
  },
  {
    document_id: 'doc_010_charge_chg1',
    company_id: 'comp_abc_001',
    document_type: 'Charge Document',
    title: 'Registration of Charge Form CHG-1 & Certificate CHG-2',
    document_date: '2025-08-12',
    effective_date: '2025-08-12',
    source: 'MCA Charge Registry - Charge ID: 100882194',
    storage_reference: 's3://dakshakriti-vault/abc/D010_Charge_CHG1_CHG2.pdf',
    file_hash: 'sha256:ff00112233445566778899aabbccddeeff001122334455667788990011223344',
    version: 1,
    content_text: `CERTIFICATE OF REGISTRATION OF CHARGE (FORM CHG-2)
Corporate Identity Number: U72900DL2024PTC392811
Charge ID: 100882194
Charge Holder: HDFC Bank Limited
Amount Secured: INR 5,00,00,000/- (Rupees Five Crores)
Property Charged: First exclusive charge on all present and future Plant & Machinery, Equipment, Book Debts and Intellectual Property of ABC Private Limited.
Date of Creation: 12 August 2025. Date of Registration: 24 August 2025.`,
    parties: ['HDFC Bank Limited', 'ABC Private Limited', 'Rahul Sharma'],
    processing_status: 'REVIEWED',
    classification_confidence: 0.99,
    verification_status: 'HUMAN_VERIFIED'
  },
  {
    document_id: 'doc_011_roc_notice',
    company_id: 'comp_abc_001',
    document_type: 'Regulatory Notice',
    title: 'ROC Notice under Section 206(1) for Financial Disclosures',
    document_date: '2025-11-15',
    effective_date: '2025-11-15',
    source: 'Office of Registrar of Companies, NCT of Delhi & Haryana',
    storage_reference: 's3://dakshakriti-vault/abc/D011_ROC_Notice_Sec206.pdf',
    file_hash: 'sha256:00112233445566778899aabbccddeeff00112233445566778899001122334455',
    version: 1,
    content_text: `GOVERNMENT OF INDIA, MINISTRY OF CORPORATE AFFAIRS
OFFICE OF REGISTRAR OF COMPANIES, DELHI & HARYANA
Notice Ref: ROC/DEL/Sec206/2025/882 Dated 15-11-2025
To: ABC Private Limited & Directors
SUBJECT: INQUIRY UNDER SECTION 206(1) OF THE COMPANIES ACT, 2013.
Upon preliminary scrutiny of filings, you are directed to submit within 15 days:
1. Proof of stamp duty compliance on Share Transfer executed in Sept 2024 (Form SH-4).
2. Clarification on effective resignation date of Director Priya Mehta vis-a-vis Form DIR-12 and Form DIR-11 filed with contradictory dates.`,
    parties: ['Registrar of Companies, Delhi', 'ABC Private Limited'],
    processing_status: 'REVIEWED',
    classification_confidence: 0.97,
    verification_status: 'SOURCE_RECORD'
  },
  {
    document_id: 'doc_012_nclt_order',
    company_id: 'comp_abc_001',
    document_type: 'Tribunal Order',
    title: 'NCLT Delhi Bench Interim Order - Company Petition CP/142/ND/2026',
    document_date: '2026-02-20',
    effective_date: '2026-02-20',
    source: 'National Company Law Tribunal, Bench-III New Delhi',
    storage_reference: 's3://dakshakriti-vault/abc/D012_NCLT_Interim_Order_2026.pdf',
    file_hash: 'sha256:112233445566778899aabbccddeeff0011223344556677889900112233445566',
    version: 1,
    content_text: `BEFORE THE NATIONAL COMPANY LAW TRIBUNAL, NEW DELHI BENCH (COURT-III)
CP No. 142/241-242/ND/2026
In the matter of: Priya Mehta (Petitioner) Vs. ABC Private Limited & Ors. (Respondents)
ORDER DATED 20.02.2026:
Heard learned counsel for Petitioner alleging improper alienation of shareholding and suppression of board notices.
ORDER:
1. Respondents directed to maintain status quo on shareholding pattern as on date.
2. No further encumbrance or charge shall be created on plant & machinery without leave of Tribunal.
3. Respondents shall file detailed reply affidavit within 3 weeks.
Re-notify on 15 April 2026 for further consideration.`,
    parties: ['National Company Law Tribunal', 'Priya Mehta', 'Rahul Sharma', 'ABC Private Limited'],
    processing_status: 'REVIEWED',
    classification_confidence: 0.98,
    verification_status: 'SOURCE_RECORD'
  }
];

export const INITIAL_EVIDENCE: Evidence[] = [
  {
    evidence_id: 'evi_01',
    company_id: 'comp_abc_001',
    document_id: 'doc_001_inc',
    page_number: 1,
    section_reference: 'CIN Declaration & Heading',
    text_excerpt: 'I hereby certify that ABC PRIVATE LIMITED is incorporated on this Tenth day of January Two Thousand Twenty-Four under the Companies Act, 2013. CIN: U72900DL2024PTC392811.',
    proposition: 'ABC Private Limited was legally incorporated on 10 January 2024 with CIN U72900DL2024PTC392811.',
    evidence_type: 'DIRECT',
    confidence: 0.99,
    verification_status: 'HUMAN_VERIFIED',
    reviewer: 'Deepak Sharma, FCS',
    review_date: '2024-01-11'
  },
  {
    evidence_id: 'evi_02',
    company_id: 'comp_abc_001',
    document_id: 'doc_001_inc',
    page_number: 1,
    section_reference: 'First Directors Clause',
    text_excerpt: 'First Directors named in Articles: Rahul Sharma, Priya Mehta.',
    proposition: 'Rahul Sharma and Priya Mehta are the first directors of ABC Private Limited.',
    evidence_type: 'DIRECT',
    confidence: 0.99,
    verification_status: 'HUMAN_VERIFIED',
    reviewer: 'Deepak Sharma, FCS',
    review_date: '2024-01-11'
  },
  {
    evidence_id: 'evi_03',
    company_id: 'comp_abc_001',
    document_id: 'doc_005_dir_app',
    page_number: 1,
    section_reference: 'Resolution 1 - Appointment',
    text_excerpt: 'Ms. Anita Mehta (DIN: 09124482) be and is hereby appointed as an Additional Director of ABC Private Limited with effect from 12th March 2024.',
    proposition: 'Anita Mehta was appointed Additional Director on 12 March 2024 pursuant to Section 161(1).',
    evidence_type: 'DIRECT',
    confidence: 0.97,
    verification_status: 'HUMAN_VERIFIED',
    reviewer: 'Deepak Sharma, FCS',
    review_date: '2024-03-26'
  },
  {
    evidence_id: 'evi_04',
    company_id: 'comp_abc_001',
    document_id: 'doc_006_share_issue',
    page_number: 1,
    section_reference: 'Allotment Table',
    text_excerpt: 'Paid-up share capital increased from Rs. 10,00,000/- (1,00,000 shares) to Rs. 25,00,000/- (2,50,000 shares) on 20 June 2024.',
    proposition: 'Share capital increased to ₹25,00,000 via rights issue allotment on 20 June 2024.',
    evidence_type: 'DIRECT',
    confidence: 0.96,
    verification_status: 'HUMAN_VERIFIED',
    reviewer: 'Deepak Sharma, FCS',
    review_date: '2024-07-05'
  },
  {
    evidence_id: 'evi_05',
    company_id: 'comp_abc_001',
    document_id: 'doc_007_share_transfer',
    page_number: 1,
    section_reference: 'Transfer Deed SH-4',
    text_excerpt: 'Priya Mehta transferred 62,500 Equity Shares to Sunil Kapoor for consideration of INR 62,50,000 approved by Board on 15 September 2024.',
    proposition: 'Sunil Kapoor acquired 25% equity stake from Priya Mehta on 15 September 2024.',
    evidence_type: 'DIRECT',
    confidence: 0.95,
    verification_status: 'HUMAN_VERIFIED',
    reviewer: 'Deepak Sharma, FCS',
    review_date: '2024-09-20'
  },
  {
    evidence_id: 'evi_06',
    company_id: 'comp_abc_001',
    document_id: 'doc_008_resignation_priya',
    page_number: 1,
    section_reference: 'Resignation Letter Header',
    text_excerpt: 'I, Priya Mehta, hereby tender my resignation as Director of ABC Private Limited with effect from 10th January 2025.',
    proposition: 'Priya Mehta tendered resignation as Director on 10 January 2025.',
    evidence_type: 'CONTRADICTORY',
    confidence: 0.70,
    verification_status: 'DISPUTED',
    reviewer: 'Deepak Sharma, FCS',
    review_date: '2025-01-20'
  },
  {
    evidence_id: 'evi_07',
    company_id: 'comp_abc_001',
    document_id: 'doc_009_borrowing_res',
    page_number: 1,
    section_reference: 'Resolution Paragraph 2',
    text_excerpt: 'Rahul Sharma, Managing Director, be authorized to execute Loan Agreement, Hypothecation Deed, Promissory Notes and create charge on company assets for INR 5,00,00,000.',
    proposition: 'Managing Director Rahul Sharma was granted explicit authority to execute borrowing and create charge up to ₹5 Crore.',
    evidence_type: 'DIRECT',
    confidence: 0.98,
    verification_status: 'HUMAN_VERIFIED',
    reviewer: 'Deepak Sharma, FCS',
    review_date: '2025-08-20'
  },
  {
    evidence_id: 'evi_08',
    company_id: 'comp_abc_001',
    document_id: 'doc_010_charge_chg1',
    page_number: 1,
    section_reference: 'CHG-2 Certificate Details',
    text_excerpt: 'Charge ID: 100882194. Charge Holder: HDFC Bank Limited. Amount Secured: INR 5,00,00,000/-. Property: Plant & Machinery, Equipment, Book Debts.',
    proposition: 'A valid statutory charge of ₹5 Crore was created in favour of HDFC Bank on 12 August 2025.',
    evidence_type: 'DIRECT',
    confidence: 0.99,
    verification_status: 'HUMAN_VERIFIED',
    reviewer: 'Deepak Sharma, FCS',
    review_date: '2025-08-25'
  },
  {
    evidence_id: 'evi_09',
    company_id: 'comp_abc_001',
    document_id: 'doc_011_roc_notice',
    page_number: 1,
    section_reference: 'Item 2 of ROC Inquiries',
    text_excerpt: 'Clarification on effective resignation date of Director Priya Mehta vis-a-vis Form DIR-12 and Form DIR-11 filed with contradictory dates.',
    proposition: 'ROC flagged a contradiction in Priya Mehta cessation records on 15 November 2025.',
    evidence_type: 'DIRECT',
    confidence: 0.95,
    verification_status: 'SOURCE_RECORD',
    reviewer: 'Deepak Sharma, FCS',
    review_date: '2025-11-20'
  },
  {
    evidence_id: 'evi_10',
    company_id: 'comp_abc_001',
    document_id: 'doc_012_nclt_order',
    page_number: 1,
    section_reference: 'Operative Directions 1 & 2',
    text_excerpt: '1. Respondents directed to maintain status quo on shareholding pattern. 2. No further encumbrance or charge shall be created on plant & machinery without leave of Tribunal.',
    proposition: 'NCLT passed status quo order restraining shareholding alterations and further asset encumbrance on 20 February 2026.',
    evidence_type: 'DIRECT',
    confidence: 0.98,
    verification_status: 'SOURCE_RECORD',
    reviewer: 'Deepak Sharma, FCS',
    review_date: '2026-02-22'
  }
];

export const INITIAL_CORPORATE_EVENTS: CorporateEvent[] = [
  {
    event_id: 'evt_001_inc',
    company_id: 'comp_abc_001',
    event_type: 'INCORPORATION',
    title: 'Company Incorporation',
    event_date: '2024-01-10',
    effective_date: '2024-01-10',
    filing_date: '2024-01-08',
    verification_date: '2024-01-11',
    actors: [
      { person_id: 'per_rahul_01', name: 'Rahul Sharma', role: 'Promoter / Director' },
      { person_id: 'per_priya_02', name: 'Priya Mehta', role: 'Promoter / Director' }
    ],
    decision_maker: 'Subscribers / Registrar of Companies',
    authority: 'Section 7, Companies Act 2013',
    description: 'ABC Private Limited incorporated with Authorized Capital ₹50 Lakhs and Paid-up Capital ₹10 Lakhs. First Directors: Rahul Sharma and Priya Mehta.',
    source_document_ids: ['doc_001_inc', 'doc_002_moa', 'doc_003_aoa'],
    evidence_ids: ['evi_01', 'evi_02'],
    legal_source_ids: ['leg_sec_7'],
    consequence: 'Corporate legal entity came into existence; Initial Board created with 2 Directors; 1,00,000 Equity Shares issued.',
    status: 'HUMAN_VERIFIED',
    confidence: 0.99,
    created_at: '2024-01-10T10:00:00Z'
  },
  {
    event_id: 'evt_002_dir_app',
    company_id: 'comp_abc_001',
    event_type: 'DIRECTOR_APPOINTMENT',
    title: 'Appointment of Anita Mehta as Additional Director',
    event_date: '2024-03-12',
    effective_date: '2024-03-12',
    filing_date: '2024-03-25',
    verification_date: '2024-03-26',
    actors: [
      { person_id: 'per_anita_03', name: 'Anita Mehta', role: 'Additional Director' },
      { person_id: 'per_rahul_01', name: 'Rahul Sharma', role: 'Managing Director' }
    ],
    decision_maker: 'Board of Directors',
    authority: 'Section 161(1) of Companies Act, 2013 and Clause 41 of AOA',
    description: 'The Board resolved to appoint Anita Mehta as an Additional Director to oversee company technology operations until next AGM.',
    source_document_ids: ['doc_005_dir_app'],
    evidence_ids: ['evi_03'],
    legal_source_ids: ['leg_sec_149'],
    consequence: 'Board strength increased from 2 to 3 Directors (Rahul Sharma, Priya Mehta, Anita Mehta).',
    status: 'HUMAN_VERIFIED',
    confidence: 0.97,
    created_at: '2024-03-12T11:30:00Z'
  },
  {
    event_id: 'evt_003_share_issue',
    company_id: 'comp_abc_001',
    event_type: 'SHARE_ISSUE',
    title: 'Rights Issue Allotment of 1,50,000 Shares',
    event_date: '2024-06-20',
    effective_date: '2024-06-20',
    filing_date: '2024-07-04',
    verification_date: '2024-07-05',
    actors: [
      { person_id: 'per_rahul_01', name: 'Rahul Sharma', role: 'Director & Allottee' },
      { person_id: 'per_priya_02', name: 'Priya Mehta', role: 'Director & Allottee' }
    ],
    decision_maker: 'Board of Directors',
    authority: 'Section 62(1)(a) of Companies Act, 2013',
    description: 'Allotment of 1,50,000 equity shares of ₹10 each at par on Rights basis: 90,000 to Rahul Sharma and 60,000 to Priya Mehta.',
    source_document_ids: ['doc_006_share_issue'],
    evidence_ids: ['evi_04'],
    legal_source_ids: ['leg_sec_62'],
    consequence: 'Paid-up capital increased from ₹10 Lakhs to ₹25 Lakhs (2,50,000 shares total).',
    status: 'HUMAN_VERIFIED',
    confidence: 0.96,
    created_at: '2024-06-20T14:00:00Z'
  },
  {
    event_id: 'evt_004_share_transfer',
    company_id: 'comp_abc_001',
    event_type: 'SHARE_TRANSFER',
    title: 'Share Transfer of 62,500 Equity Shares to Sunil Kapoor',
    event_date: '2024-09-15',
    effective_date: '2024-09-15',
    filing_date: '2024-09-28',
    verification_date: '2024-10-01',
    actors: [
      { person_id: 'per_priya_02', name: 'Priya Mehta', role: 'Transferor' },
      { person_id: 'per_sunil_05', name: 'Sunil Kapoor', role: 'Transferee' },
      { person_id: 'per_rahul_01', name: 'Rahul Sharma', role: 'Board Approver' }
    ],
    decision_maker: 'Board of Directors',
    authority: 'Section 56 of Companies Act, 2013 and Clause 14 of AOA',
    description: 'Priya Mehta transferred 62,500 equity shares (25% voting equity) to Sunil Kapoor for ₹62.5 Lakhs.',
    source_document_ids: ['doc_007_share_transfer'],
    evidence_ids: ['evi_05'],
    legal_source_ids: ['leg_sec_56'],
    consequence: 'Ownership changed: Rahul Sharma 60% (1,50,000), Priya Mehta 15% (37,500), Sunil Kapoor 25% (62,500). New outside investor entered.',
    status: 'HUMAN_VERIFIED',
    confidence: 0.95,
    created_at: '2024-09-15T15:00:00Z'
  },
  {
    event_id: 'evt_005_dir_resig',
    company_id: 'comp_abc_001',
    event_type: 'DIRECTOR_RESIGNATION',
    title: 'Resignation of Director Priya Mehta [DISPUTED DATE CONFLICT]',
    event_date: '2025-01-10',
    effective_date: '2025-01-10',
    filing_date: '2025-01-20',
    verification_date: undefined,
    actors: [
      { person_id: 'per_priya_02', name: 'Priya Mehta', role: 'Resigning Director' },
      { person_id: 'per_rahul_01', name: 'Rahul Sharma', role: 'Board Chair' }
    ],
    decision_maker: 'Priya Mehta (Individual Resignation)',
    authority: 'Section 168 of Companies Act, 2013',
    description: 'Priya Mehta tendered resignation. Discrepancy detected: Letter dated 10 Jan 2025 vs DIR-11 filing citing 15 Jan 2025.',
    source_document_ids: ['doc_008_resignation_priya'],
    evidence_ids: ['evi_06'],
    legal_source_ids: ['leg_sec_168'],
    consequence: 'Board strength reduced from 3 to 2 Directors (Rahul Sharma & Anita Mehta). Unresolved conflict on exact date of cessation.',
    status: 'DISPUTED',
    confidence: 0.72,
    created_at: '2025-01-10T12:00:00Z'
  },
  {
    event_id: 'evt_006_dir_vikram',
    company_id: 'comp_abc_001',
    event_type: 'DIRECTOR_APPOINTMENT',
    title: 'Appointment of Vikram Singh as Independent Director',
    event_date: '2025-02-18',
    effective_date: '2025-02-18',
    filing_date: '2025-02-28',
    verification_date: '2025-03-02',
    actors: [
      { person_id: 'per_vikram_04', name: 'Vikram Singh', role: 'Independent Director' },
      { person_id: 'per_rahul_01', name: 'Rahul Sharma', role: 'Managing Director' }
    ],
    decision_maker: 'Board of Directors',
    authority: 'Section 149(4) & Section 161 of Companies Act, 2013',
    description: 'Appointment of Vikram Singh (DIN: 06541299) as Independent Director to strengthen board governance.',
    source_document_ids: [],
    evidence_ids: [],
    legal_source_ids: ['leg_sec_149'],
    consequence: 'Board restored to 3 Directors: Rahul Sharma, Anita Mehta, and Vikram Singh.',
    status: 'HUMAN_VERIFIED',
    confidence: 0.94,
    created_at: '2025-02-18T10:00:00Z'
  },
  {
    event_id: 'evt_007_borrowing',
    company_id: 'comp_abc_001',
    event_type: 'BORROWING',
    title: 'Approval of HDFC Bank Loan Facility of ₹5 Crore',
    event_date: '2025-08-04',
    effective_date: '2025-08-04',
    filing_date: '2025-08-18',
    verification_date: '2025-08-20',
    actors: [
      { person_id: 'per_rahul_01', name: 'Rahul Sharma', role: 'Managing Director' },
      { person_id: 'per_anita_03', name: 'Anita Mehta', role: 'Director' }
    ],
    decision_maker: 'Board of Directors',
    authority: 'Section 179(3)(d) of Companies Act, 2013',
    description: 'Board resolution approving borrowing of ₹5,00,00,000 from HDFC Bank and delegating execution authority to Rahul Sharma.',
    source_document_ids: ['doc_009_borrowing_res'],
    evidence_ids: ['evi_07'],
    legal_source_ids: ['leg_sec_179_180'],
    consequence: 'Company entered borrowing obligation; Form MGT-14 filed with ROC.',
    status: 'HUMAN_VERIFIED',
    confidence: 0.98,
    created_at: '2025-08-04T16:00:00Z'
  },
  {
    event_id: 'evt_008_charge',
    company_id: 'comp_abc_001',
    event_type: 'CHARGE_CREATION',
    title: 'Statutory Charge Created with HDFC Bank for ₹5 Crore',
    event_date: '2025-08-12',
    effective_date: '2025-08-12',
    filing_date: '2025-08-24',
    verification_date: '2025-08-25',
    actors: [
      { name: 'HDFC Bank Limited', role: 'Charge Holder / Lender' },
      { person_id: 'per_rahul_01', name: 'Rahul Sharma', role: 'Authorized Signatory' }
    ],
    decision_maker: 'Registrar of Companies & HDFC Bank',
    authority: 'Section 77(1) of Companies Act, 2013',
    description: 'Charge ID 100882194 registered with ROC on all present and future Plant & Machinery, Equipment, Book Debts of ABC Pvt Ltd.',
    source_document_ids: ['doc_010_charge_chg1'],
    evidence_ids: ['evi_08'],
    legal_source_ids: ['leg_sec_77'],
    consequence: 'Charge recorded in Register of Charges (CHG-7) and MCA Public Index of Charges; Encumbrance created.',
    status: 'HUMAN_VERIFIED',
    confidence: 0.99,
    created_at: '2025-08-12T11:00:00Z'
  },
  {
    event_id: 'evt_009_roc_notice',
    company_id: 'comp_abc_001',
    event_type: 'REGULATORY_NOTICE',
    title: 'ROC Regulatory Inquiry under Section 206',
    event_date: '2025-11-15',
    effective_date: '2025-11-15',
    verification_date: '2025-11-20',
    actors: [
      { name: 'Registrar of Companies, Delhi', role: 'Regulatory Authority' }
    ],
    decision_maker: 'Registrar of Companies',
    authority: 'Section 206(1) of Companies Act, 2013',
    description: 'ROC issued notice requesting explanation on contradictory resignation dates for Priya Mehta and proof of stamp duty on 2024 share transfer.',
    source_document_ids: ['doc_011_roc_notice'],
    evidence_ids: ['evi_09'],
    legal_source_ids: ['leg_sec_206'],
    consequence: 'Triggered urgent regulatory inquiry obligation with 15-day compliance deadline.',
    status: 'SOURCE_RECORD',
    confidence: 0.96,
    created_at: '2025-11-15T09:00:00Z'
  },
  {
    event_id: 'evt_010_nclt_petition',
    company_id: 'comp_abc_001',
    event_type: 'TRIBUNAL_ORDER',
    title: 'NCLT Interim Order in Shareholder Dispute CP/142/ND/2026',
    event_date: '2026-02-20',
    effective_date: '2026-02-20',
    verification_date: '2026-02-22',
    actors: [
      { person_id: 'per_priya_02', name: 'Priya Mehta', role: 'Petitioner (15% Shareholder)' },
      { person_id: 'per_rahul_01', name: 'Rahul Sharma', role: 'Respondent No. 2' },
      { name: 'NCLT New Delhi Bench', role: 'Adjudicating Authority' }
    ],
    decision_maker: 'Hon’ble Member (Judicial), NCLT Delhi Bench',
    authority: 'Section 241 & 242 of Companies Act, 2013',
    description: 'Interim order restraining modification of shareholding and creation of any further encumbrance on company assets.',
    source_document_ids: ['doc_012_nclt_order'],
    evidence_ids: ['evi_10'],
    legal_source_ids: ['leg_sec_241'],
    consequence: 'Direct restriction on corporate transactions, equity restructuring and borrowing powers pending final tribunal hearing.',
    status: 'SOURCE_RECORD',
    confidence: 0.98,
    created_at: '2026-02-20T17:30:00Z'
  }
];

export const INITIAL_COMPLIANCE_ITEMS: ComplianceItem[] = [
  {
    compliance_id: 'comp_item_01',
    company_id: 'comp_abc_001',
    requirement_title: 'Filing Form DIR-12 for Director Appointment (Anita Mehta)',
    legal_source_id: 'leg_sec_149',
    trigger_event_id: 'evt_002_dir_app',
    trigger_type: 'EVENT',
    due_date: '2024-04-11',
    responsible_actor: 'Company Secretary / Rahul Sharma',
    required_filing: 'Form DIR-12 with ROC',
    expected_evidence: 'Form DIR-12 MCA Challan & SRN R99281204',
    found_evidence_id: 'evi_03',
    status: 'VERIFIED',
    risk_level: 'LOW',
    verification_status: 'HUMAN_VERIFIED'
  },
  {
    compliance_id: 'comp_item_02',
    company_id: 'comp_abc_001',
    requirement_title: 'Return of Allotment Form PAS-3 for Rights Issue',
    legal_source_id: 'leg_sec_62',
    trigger_event_id: 'evt_003_share_issue',
    trigger_type: 'EVENT',
    due_date: '2024-07-20',
    responsible_actor: 'Company Secretary',
    required_filing: 'Form PAS-3 with ROC',
    expected_evidence: 'Approved PAS-3 form and list of allottees certified by CS',
    found_evidence_id: 'evi_04',
    status: 'VERIFIED',
    risk_level: 'LOW',
    verification_status: 'HUMAN_VERIFIED'
  },
  {
    compliance_id: 'comp_item_03',
    company_id: 'comp_abc_001',
    requirement_title: 'Resolution of Priya Mehta Cessation Date & DIR-12 / DIR-11 Conflict',
    legal_source_id: 'leg_sec_168',
    trigger_event_id: 'evt_005_dir_resig',
    trigger_type: 'EVENT',
    due_date: '2025-02-09',
    responsible_actor: 'Board of Directors & CS',
    required_filing: 'DIR-12 Reconciliation & Board Ratification',
    expected_evidence: 'Board acknowledgement with verified receipt date and revised DIR-12 filing',
    status: 'DISPUTED',
    risk_level: 'HIGH',
    verification_status: 'DISPUTED'
  },
  {
    compliance_id: 'comp_item_04',
    company_id: 'comp_abc_001',
    requirement_title: 'Registration of Charge Form CHG-1 for ₹5 Cr Loan',
    legal_source_id: 'leg_sec_77',
    trigger_event_id: 'evt_008_charge',
    trigger_type: 'EVENT',
    due_date: '2025-09-11',
    responsible_actor: 'Managing Director & HDFC Bank',
    required_filing: 'Form CHG-1 & CHG-2 Certificate',
    expected_evidence: 'MCA Certificate of Registration of Charge CHG-2',
    found_evidence_id: 'evi_08',
    status: 'VERIFIED',
    risk_level: 'LOW',
    verification_status: 'HUMAN_VERIFIED'
  },
  {
    compliance_id: 'comp_item_05',
    company_id: 'comp_abc_001',
    requirement_title: 'Response to ROC Section 206 Inquiry Notice',
    legal_source_id: 'leg_sec_206',
    trigger_event_id: 'evt_009_roc_notice',
    trigger_type: 'EVENT',
    due_date: '2025-11-30',
    responsible_actor: 'Company Secretary & Legal Counsel',
    required_filing: 'Written Response with Annexures (Stamp Duty proof & DIR-12 reconciliation)',
    expected_evidence: 'ROC Acknowledgement receipt of reply letter',
    status: 'MISSING_EVIDENCE',
    risk_level: 'HIGH',
    verification_status: 'NEEDS_REVIEW'
  },
  {
    compliance_id: 'comp_item_06',
    company_id: 'comp_abc_001',
    requirement_title: 'Filing of NCLT Interim Order Form INC-28 with ROC',
    legal_source_id: 'leg_sec_241',
    trigger_event_id: 'evt_010_nclt_petition',
    trigger_type: 'EVENT',
    due_date: '2026-03-22',
    responsible_actor: 'Company Secretary',
    required_filing: 'Form INC-28 attaching NCLT Order dated 20.02.2026',
    expected_evidence: 'Form INC-28 MCA Filing Receipt & SRN',
    status: 'OVERDUE',
    risk_level: 'CRITICAL',
    verification_status: 'NEEDS_REVIEW'
  }
];

export const INITIAL_CONTRACTS: CommercialContract[] = [
  {
    contract_id: 'con_001_loan',
    company_id: 'comp_abc_001',
    title: 'Secured Term Loan Facility Agreement - ₹5,00,00,000',
    counterparty: 'HDFC Bank Limited',
    contract_type: 'Loan Agreement',
    execution_date: '2025-08-04',
    effective_date: '2025-08-04',
    expiry_date: '2030-08-03',
    value: 50000000,
    signatory_name: 'Rahul Sharma',
    signatory_authority_verified: true,
    obligations: [
      { description: 'Quarterly principal and interest repayment of ₹32.5 Lakhs', due_date: '2026-03-31', status: 'Upcoming' },
      { description: 'Maintain current ratio of not less than 1.33:1', due_date: '2026-03-31', status: 'Compliant' },
      { description: 'Notify lender of any litigation exceeding ₹25 Lakhs within 7 days', due_date: '2026-02-27', status: 'At Risk (NCLT petition filed)' }
    ],
    notice_period_days: 30,
    dispute_status: 'None',
    verification_status: 'HUMAN_VERIFIED'
  },
  {
    contract_id: 'con_002_lease',
    company_id: 'comp_abc_001',
    title: 'Commercial Office Lease Agreement - Barakhamba Road',
    counterparty: 'DLF Commercial Properties Limited',
    contract_type: 'Lease Agreement',
    execution_date: '2024-01-05',
    effective_date: '2024-01-10',
    expiry_date: '2027-01-09',
    value: 7200000, // 3 years lease
    signatory_name: 'Rahul Sharma',
    signatory_authority_verified: true,
    obligations: [
      { description: 'Monthly lease rental payment of ₹2,00,000 before 7th of every month', due_date: '2026-04-07', status: 'Upcoming' }
    ],
    notice_period_days: 90,
    dispute_status: 'None',
    verification_status: 'HUMAN_VERIFIED'
  },
  {
    contract_id: 'con_003_saas_vendor',
    company_id: 'comp_abc_001',
    title: 'Master Cloud Infrastructure Agreement',
    counterparty: 'CloudCore Technologies Pvt Ltd',
    contract_type: 'Master Services Agreement',
    execution_date: '2024-04-01',
    effective_date: '2024-04-01',
    expiry_date: '2026-03-31',
    value: 3600000,
    signatory_name: 'Anita Mehta',
    signatory_authority_verified: true,
    obligations: [
      { description: 'Renewal notice required 60 days prior to expiry', due_date: '2026-01-30', status: 'Delayed' },
      { description: 'Final invoice payment of ₹3,50,000', due_date: '2026-03-15', status: 'Overdue' }
    ],
    notice_period_days: 60,
    dispute_status: 'Notice Issued',
    verification_status: 'NEEDS_REVIEW'
  }
];

export const INITIAL_PROCEEDINGS: LegalProceeding[] = [
  {
    proceeding_id: 'proc_001_nclt',
    company_id: 'comp_abc_001',
    forum: 'NCLT Delhi Bench',
    case_number: 'CP No. 142/241-242/ND/2026',
    matter_title: 'Priya Mehta v. ABC Private Limited, Rahul Sharma & Others',
    opposing_party: 'Priya Mehta (Ex-Director & 15% Shareholder)',
    filing_date: '2026-01-28',
    stage: 'Interim Order',
    claims: [
      'Petition under Section 241 & 242 alleging oppression and mismanagement',
      'Challenging irregular rights issue of shares in June 2024',
      'Alleging dilution of petitioner from 40% to 15%',
      'Disputing date of resignation and removal from board management'
    ],
    defence: [
      'Rights issue was conducted strictly in accordance with Section 62(1)(a) with proper notice given to petitioner',
      'Share transfer to Sunil Kapoor was executed voluntarily by petitioner under Form SH-4',
      'Resignation was formally submitted by petitioner on 10 January 2025'
    ],
    amount_in_dispute: 15000000,
    corporate_impact: 'Status quo on shareholding pattern; injunction against creating any further charge or alienating fixed assets.',
    status: 'Pending',
    verification_status: 'SOURCE_RECORD'
  },
  {
    proceeding_id: 'proc_002_roc',
    company_id: 'comp_abc_001',
    forum: 'ROC Delhi',
    case_number: 'Inquiry Ref. ROC/DEL/Sec206/2025/882',
    matter_title: 'Inquiry under Section 206(1) regarding Stamp Duty & DIR Filings',
    opposing_party: 'Registrar of Companies, Delhi',
    filing_date: '2025-11-15',
    stage: 'Notice',
    claims: [
      'Explanation sought for inconsistent resignation dates across DIR-12 and DIR-11',
      'Verification of stamp duty franking on Share Transfer Deed dated 15 September 2024'
    ],
    defence: [
      'Draft response prepared by Company Secretary; stamp duty receipt verified with treasury department; reconciliation filed.'
    ],
    amount_in_dispute: 500000,
    corporate_impact: 'Risk of compounding proceedings or inspection order under Section 206(4) if reply is not accepted.',
    status: 'Pending',
    verification_status: 'SOURCE_RECORD'
  }
];

export const INITIAL_RED_FLAGS: RedFlag[] = [
  {
    flag_id: 'rf_01',
    company_id: 'comp_abc_001',
    category: 'GOVERNANCE',
    title: 'Director Resignation Date Conflict (10 Jan vs 15 Jan 2025)',
    description: 'Resignation letter cites 10 Jan 2025, but individual Form DIR-11 filed with MCA cites 15 Jan 2025. ROC has issued an inquiry under Section 206.',
    severity: 'HIGH',
    related_event_id: 'evt_005_dir_resig',
    related_document_id: 'doc_008_resignation_priya',
    status: 'OPEN'
  },
  {
    flag_id: 'rf_02',
    company_id: 'comp_abc_001',
    category: 'LITIGATION',
    title: 'Active NCLT Injunction on Shareholding & Asset Encumbrance',
    description: 'NCLT Order dated 20 Feb 2026 in CP 142/ND/2026 restrains any changes to share capital and creation of fresh charges on company plant & machinery.',
    severity: 'CRITICAL',
    related_event_id: 'evt_010_nclt_petition',
    related_document_id: 'doc_012_nclt_order',
    status: 'OPEN'
  },
  {
    flag_id: 'rf_03',
    company_id: 'comp_abc_001',
    category: 'CHARGES',
    title: 'Exclusive Fixed Asset Charge of ₹5 Crore with HDFC Bank',
    description: 'Charge ID 100882194 covers all equipment, plant & machinery and intellectual property. Bank loan agreement contains covenant to report material disputes.',
    severity: 'MEDIUM',
    related_event_id: 'evt_008_charge',
    related_document_id: 'doc_010_charge_chg1',
    status: 'OPEN'
  },
  {
    flag_id: 'rf_04',
    company_id: 'comp_abc_001',
    category: 'EVIDENCE',
    title: 'Overdue Form INC-28 Filing for NCLT Order',
    description: 'Statutory compliance requirement to file NCLT Interim Order with ROC within 30 days is approaching due date with missing e-form draft.',
    severity: 'HIGH',
    status: 'REVIEW_REQUIRED'
  }
];

export const INITIAL_VERIFICATION_ITEMS: VerificationItem[] = [
  {
    id: 'ver_01',
    company_id: 'comp_abc_001',
    category: 'DATE_CONFLICTS',
    title: 'Priya Mehta Resignation Date Discrepancy',
    ai_finding: 'Extracted Resignation Date from Letter D008 is 10 Jan 2025, but ROC Notice D011 references 15 Jan 2025 from Form DIR-11.',
    source_doc_title: 'D008 Resignation Letter vs D011 ROC Notice',
    source_doc_page: 1,
    evidence_text: 'Letter: "with effect from 10th January 2025" vs Notice: "contradictory date 15th January 2025 cited in DIR-11"',
    suggested_interpretation: 'Mark as Disputed until Board confirmation minutes or postal receipt is inspected.',
    confidence: 0.72,
    conflicting_record: 'Form DIR-11 filed with MCA Portal',
    status: 'NEEDS_REVIEW'
  },
  {
    id: 'ver_02',
    company_id: 'comp_abc_001',
    category: 'PENDING_ENTITIES',
    title: 'Entity Resolution: Sunil Kapoor vs S. Kapoor',
    ai_finding: 'Transferee in Share Transfer Deed D007 is named "Sunil Kapoor". Cross-referenced with PAN DDFPK9912L.',
    source_doc_title: 'D007 Share Transfer Deed Form SH-4',
    source_doc_page: 1,
    evidence_text: 'Transferee: Sunil Kapoor, S/o Late O.P. Kapoor, Resident of Vasant Vihar, New Delhi.',
    suggested_interpretation: 'High-confidence link to Person ID per_sunil_05. Confirm merge into canonical registry.',
    confidence: 0.96,
    status: 'NEEDS_REVIEW'
  },
  {
    id: 'ver_03',
    company_id: 'comp_abc_001',
    category: 'MISSING_EVIDENCE',
    title: 'Proof of Stamp Duty Payment for Share Transfer Deed D007',
    ai_finding: 'Transfer of 62,500 shares recorded in SH-4, but physical e-stamp certificate attachment was not uploaded.',
    source_doc_title: 'D007 Share Transfer Deed Form SH-4',
    source_doc_page: 2,
    evidence_text: 'Section 56 requires instrument of transfer to be duly stamped.',
    suggested_interpretation: 'Request e-stamp treasury receipt from company secretary records.',
    confidence: 0.88,
    status: 'NEEDS_REVIEW'
  },
  {
    id: 'ver_04',
    company_id: 'comp_abc_001',
    category: 'AUTHORITY_MISMATCH',
    title: 'CloudCore MSA Signatory Authority Verification',
    ai_finding: 'Anita Mehta executed CloudCore contract on 01 Apr 2024. Board authorization occurred on 12 Mar 2024 as Additional Director.',
    source_doc_title: 'Master Cloud Infrastructure Agreement (con_003)',
    source_doc_page: 1,
    evidence_text: 'Signed by: Anita Mehta, Director. Contract Value: ₹36,00,000.',
    suggested_interpretation: 'Verify whether specific power of attorney or board resolution authorized execution of IT contracts exceeding ₹25L.',
    confidence: 0.84,
    status: 'NEEDS_REVIEW'
  }
];

export const INITIAL_AUDIT_LOGS: AuditLogEntry[] = [
  {
    audit_id: 'aud_101',
    timestamp: '2024-01-10T10:15:00Z',
    user_name: 'Deepak Sharma, FCS',
    user_role: 'PROFESSIONAL',
    action: 'CREATE_WORKSPACE',
    object_type: 'Company',
    object_id: 'comp_abc_001',
    new_value: 'Created workspace for ABC Private Limited (CIN: U72900DL2024PTC392811)',
    reason: 'Initial onboarding from MCA Gazette'
  },
  {
    audit_id: 'aud_102',
    timestamp: '2024-03-26T14:30:00Z',
    user_name: 'Deepak Sharma, FCS',
    user_role: 'PROFESSIONAL',
    action: 'VERIFY_EVENT',
    object_type: 'CorporateEvent',
    object_id: 'evt_002_dir_app',
    old_value: 'AI_EXTRACTED',
    new_value: 'HUMAN_VERIFIED',
    reason: 'Verified DIR-12 filed with ROC and DIN validation of Anita Mehta',
    source_ref: 'doc_005_dir_app'
  },
  {
    audit_id: 'aud_103',
    timestamp: '2024-10-01T11:20:00Z',
    user_name: 'Deepak Sharma, FCS',
    user_role: 'PROFESSIONAL',
    action: 'VERIFY_EVENT',
    object_type: 'CorporateEvent',
    object_id: 'evt_004_share_transfer',
    old_value: 'AI_EXTRACTED',
    new_value: 'HUMAN_VERIFIED',
    reason: 'Form SH-4 and Register of Members MGT-1 verified with Board Minutes',
    source_ref: 'doc_007_share_transfer'
  },
  {
    audit_id: 'aud_104',
    timestamp: '2025-01-20T16:00:00Z',
    user_name: 'Deepak Sharma, FCS',
    user_role: 'PROFESSIONAL',
    action: 'FLAG_CONFLICT',
    object_type: 'CorporateEvent',
    object_id: 'evt_005_dir_resig',
    old_value: 'AI_EXTRACTED',
    new_value: 'DISPUTED',
    reason: 'Conflicting dates identified between resignation letter (10 Jan) and DIR-11 (15 Jan)',
    source_ref: 'doc_008_resignation_priya'
  },
  {
    audit_id: 'aud_105',
    timestamp: '2025-08-25T17:45:00Z',
    user_name: 'Deepak Sharma, FCS',
    user_role: 'PROFESSIONAL',
    action: 'VERIFY_CHARGE',
    object_type: 'CorporateEvent',
    object_id: 'evt_008_charge',
    old_value: 'AI_EXTRACTED',
    new_value: 'HUMAN_VERIFIED',
    reason: 'MCA Form CHG-2 Certificate verified against loan agreement terms',
    source_ref: 'doc_010_charge_chg1'
  }
];

export const INITIAL_DUE_DILIGENCE_MATTERS: DueDiligenceMatter[] = [
  {
    matter_id: 'dd_01_series_b',
    company_id: 'comp_abc_001',
    title: 'Project Apex: Institutional Equity Investment Due Diligence',
    transaction_type: 'Series A/B Growth Investment (INR 25 Crore)',
    target_closing_date: '2026-05-15',
    status: 'Material Issues Identified',
    readiness_score: 68,
    critical_red_flags: 1,
    high_red_flags: 2,
    evidence_gaps: 3
  }
];
