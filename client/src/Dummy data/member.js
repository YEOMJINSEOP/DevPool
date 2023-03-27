// 한 사람의 개인 정보를 보여줄 수 있는 데이터 
export const member = {
    Member: [
        {
            member_id: 1, 
            email: "leesu0229@naver.com",
            password: "asdfqwer1234!",
            nickname: "potato"
        },
    ],
    experience: [
        {
            project_id: 1,
            project_name: 'Cooperative Project',
            project_start: '2022-02-20',
            project_end: '2022-06-09',
        },
        {
            project_id: 2,
            project_name: 'Project X',
            project_start: '2022-02-20',
            project_end: '2022-06-09',
        }
    ],
    site: [
        {
            site_id: 13209,
            site_name: 'Github',
            url: "www.naver.com"
        },
        {
            site_id: 13210,
            site_name: 'Notion',
            url: "www.google.com"
        }
    ],
    stack: [
        {
            stack_id: 1,
            stack_name: "React",
            stack_icon: `<FontAwesomeIcon icon="fa-brands fa-react" />`,
        },
        {
            stack_id: 2,
            stack_name: "Java",
            stack_icon: `<FontAwesomeIcon icon="fa-solid fa-mobile-screen-button" />`,
        }
    ],
    certificate: [
        {
            certificate_id: 1,
            certificate_name: "정보처리기사"
        },
        {
            certificate_id: 1,
            certificate_name: "SQLD"
        }
    ]
}